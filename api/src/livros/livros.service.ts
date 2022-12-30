import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { AutorRepository } from 'src/autor/autor.repository';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from './entities/livro.entity';
import { LivrosRepository } from './livros.repository';

@Injectable()
export class LivrosService {
  constructor(
    @Inject(LivrosRepository)
    private readonly livrosRepository: LivrosRepository,
    @Inject(AutorRepository)
    private readonly autorRepository: AutorRepository,
  ) { }

  async create(createLivroDto: CreateLivroDto) {
    createLivroDto.autor = await this.autorRepository.findById(createLivroDto.autorId)
    if(!createLivroDto.autor){
      throw new BadRequestException('Autor não existe')
    }
    return this.livrosRepository.createLivro(createLivroDto);
  }

  findAll(): Promise<Livro[]> {
    return this.livrosRepository.findAll();
  }

  findOne(id: number) {
    return this.livrosRepository.findById(id);
  }

  update(id: number, updateLivroDto: UpdateLivroDto) {
    return this.livrosRepository.updateLivro(id, updateLivroDto);
  }

  remove(id: number) {
    return this.livrosRepository.removeLivro;
  }
}
