import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {

  constructor(
      @InjectRepository(UsuarioRepository)
      private usuariosRepository: UsuarioRepository
  ) {}
  

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosRepository.createUsuario(createUsuarioDto);
  }

  findAll() {
    return this.usuariosRepository.findAll();
  }

  findOne(id: number) {
    return this.usuariosRepository.findById(id);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosRepository.updateUsuario(id, updateUsuarioDto);
  }

  remove(id: number) {
    return this.usuariosRepository.removeUsuario(id);
  }
}
