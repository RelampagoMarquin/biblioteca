import { Inject, Injectable } from '@nestjs/common';
import { AutorRepository } from './autor.repository';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Autor } from './entities/autor.entity';

@Injectable()
export class AutorService {

  constructor(
    @Inject(AutorRepository)
      private readonly autorRepository: AutorRepository,) {}
  
  create(createAutorDto: CreateAutorDto) {
    return this.autorRepository.createAutor(createAutorDto);
  }

  findAll() : Promise<Autor[]>{
    return this.autorRepository.findAll();
  }

  findOne(id: number) {
    return this.autorRepository.findById(id);
  }

  update(id: number, updateAutorDto: UpdateAutorDto) {
    return this.autorRepository.updateAutor(id, updateAutorDto);
  }

  remove(id: number) {
    return this.autorRepository.removeAutor;
  }
}
