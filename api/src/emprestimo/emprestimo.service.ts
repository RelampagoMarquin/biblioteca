import { Injectable } from '@nestjs/common';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { EmprestimoRepository } from './emprestimo.repository';
import { Inject } from '@nestjs/common/decorators';
import { LivrosRepository } from 'src/livros/livros.repository';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class EmprestimoService {
  constructor(
    @Inject(EmprestimoRepository)
      private readonly emprestimoRepository: EmprestimoRepository,
      @Inject(LivrosRepository)
      private readonly livrosRepository: LivrosRepository,
  ) {}

  async create(createEmprestimoDto: CreateEmprestimoDto) {
    const livro = await this.livrosRepository.findById(createEmprestimoDto.livroId)
    if(livro){
      if(livro.quantidade < 1){
        throw new BadRequestException('Livro em falta.')
      }
    }else {
        throw new BadRequestException('Livro não cadastrado.')
    }
    const emprestimo = await this.emprestimoRepository.findByUser(createEmprestimoDto.usuario)
    console.log(emprestimo)
    if(emprestimo > 0){
      throw new BadRequestException('Usuário possui retornos pendentes.')
    } 
    createEmprestimoDto.livro = livro
    this.livrosRepository.updateLivroSaida(createEmprestimoDto.livro)
    return this.emprestimoRepository.createEmprestimo(createEmprestimoDto);
    
  }

  findAll() {
    return this.emprestimoRepository.findAll();
  }

  findOne(id: number) {
    return this.emprestimoRepository.findById(id);
  }

  async updateReturn(id: number) {
    const empretimo = await this.emprestimoRepository.findById(id)
    console.log(empretimo)
    if(empretimo.retorno){
      throw new BadRequestException('Este livro já foi devolvido.');
     
    } 
    this.emprestimoRepository.updateEmprestimo(empretimo) 
    this.livrosRepository.updateLivroRetorno(empretimo.livro)
    return empretimo
  }

  remove(id: number) {
    return this.emprestimoRepository.removeEmprestimo(id);
  }

}
