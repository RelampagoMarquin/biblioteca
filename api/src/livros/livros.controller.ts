import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post('/autor/:id')
  create(@Param('id') id: number, @Body() createLivroDto: CreateLivroDto) {
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
