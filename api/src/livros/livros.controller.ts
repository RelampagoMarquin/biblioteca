import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('livros')
@UseGuards(AuthGuard('jwt'))
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

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
}
