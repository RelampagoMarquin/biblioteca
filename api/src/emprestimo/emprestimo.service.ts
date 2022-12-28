import { Injectable } from '@nestjs/common';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { EmprestimoRepository } from './emprestimo.repository';
import { Inject } from '@nestjs/common/decorators';

@Injectable()
export class EmprestimoService {
  constructor(
    @Inject(EmprestimoRepository)
      private readonly emprestimoRepository: EmprestimoRepository,
  ) {}

  create(createEmprestimoDto: CreateEmprestimoDto) {
    return this.emprestimoRepository.createEmprestimo(createEmprestimoDto);
  }

  findAll() {
    return this.emprestimoRepository.findAll();
  }

  findOne(id: number) {
    return this.emprestimoRepository.findById(id);
  }

  update(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
    return this.emprestimoRepository.updateEmprestimo(id, updateEmprestimoDto);
  }

  remove(id: number) {
    return this.emprestimoRepository.removeEmprestimo(id);
  }
}
