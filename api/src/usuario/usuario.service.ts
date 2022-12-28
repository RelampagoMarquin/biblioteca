import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {

  constructor(
    @Inject(UsuarioRepository)
      private readonly usuarioRepository: UsuarioRepository,
  ) {}
  

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.createUsuario(createUsuarioDto);
  }

  findAll() : Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  findOne(id: number) {
    return this.usuarioRepository.findById(id);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.updateUsuario(id, updateUsuarioDto);
  }

  remove(id: number) {
    return this.usuarioRepository.removeUsuario(id);
  }
}
