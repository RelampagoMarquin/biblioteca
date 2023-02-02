import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Sse, Inject } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { RedisClientType } from 'redis';

interface MessageEvent {
  data: string | object;
}


@Controller('livros')
@UseGuards(AuthGuard('jwt'))
export class LivrosController {
  constructor(private readonly livrosService: LivrosService, @Inject('CACHE_MANAGER') private redisClient : RedisClientType) {}

  @Post('/autor/:autorid')
  create(@Param('autorid') id: number, @Body() createLivroDto: CreateLivroDto) {
    createLivroDto.autorId = id
    return this.livrosService.create(createLivroDto);
  }

  @Get()
  findAll() {
    return this.livrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.livrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLivroDto: UpdateLivroDto) {
    return this.livrosService.update(+id, updateLivroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.livrosService.remove(+id);
  }

  @Sse("watch/:id")
  async sendEvent(@Param('id') id: number) : Promise<Observable<MessageEvent>> {
    let channelName = await this.livrosService.livroName(id)

    return new Observable(subscriber => {
      (async () => {
        let client;

        try {
          client = await this.redisClient.duplicate();
          client.then.connect().then(() => {
            this.redisClient.subscribe(channelName, (message, channel) => {
              console.log(message)
              subscriber.next({data: message})
            })
          })
        } catch (error) {
          console.log(error)
        }
        return () => {
          console.log("Conexão finalizada");
          subscriber.unsubscribe();
          client.disconnect();
        }
      })();
    })
  }
}
