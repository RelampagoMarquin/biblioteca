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
export class LivrosController {
  constructor(private readonly livrosService: LivrosService, @Inject('CACHE_MANAGER') private redisClient : RedisClientType) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/autor/:autorid')
  create(@Param('autorid') id: number, @Body() createLivroDto: CreateLivroDto) {
    createLivroDto.autorId = id
    return this.livrosService.create(createLivroDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.livrosService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.livrosService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLivroDto: UpdateLivroDto) {
    return this.livrosService.update(+id, updateLivroDto);
  }

  @UseGuards(AuthGuard('jwt'))
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
          console.log("Redis client created");
          client.connect((err) => {
            if (err) {
              console.log(err);
              return;
            }})
          client.then.connect().then(()  => {
            console.log("Redis client ready");
            this.redisClient.subscribe('teste', (message, channel) => {
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
