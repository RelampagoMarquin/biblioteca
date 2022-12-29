import {CreateLivroDto} from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import {Livro} from './entities/livro.entity';
import { Injectable } from "@nestjs/common";

@Injectable()
export class LivrosRepository {
    constructor(private dataSource: DataSource) { }

    findAll() {
       return this.dataSource.getRepository(Livro).createQueryBuilder('Livro').getMany();
   }

   findById(id) {
       return this.dataSource.getRepository(Livro).findOneBy(id);
   }

   createLivro( createLivroDto: CreateLivroDto){
       const {nome, genero, quantidade, edicao, ano} = createLivroDto
       let livro = this.dataSource.getRepository(Livro).create({
           nome,
           genero,
           quantidade,
           edicao,
           ano
       }) 
       return this.dataSource.getRepository(Livro).save(livro)
   }

   async updateLivro(id: number, updateLivroDto: UpdateLivroDto) {
    const {nome, genero, quantidade, edicao, ano} = updateLivroDto
       const livro = await this.findById(id)
       livro.nome = nome
       livro.genero = genero
       livro.quantidade = quantidade
       livro.edicao = edicao
       livro.ano = ano
       return this.dataSource.getRepository(Livro).save(livro);
   }

   removeLivro(id: number) {
       return this.dataSource.getRepository(Livro).delete(id)
   }  
}