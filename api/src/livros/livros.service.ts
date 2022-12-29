import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from './entities/livro.entity';
import { LivrosRepository } from './livros.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LivrosService {
  constructor(
    @Inject(LivrosRepository)
      private readonly livrosRepository: LivrosRepository,
  ) {}

  create(createLivroDto: CreateLivroDto) {  
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
