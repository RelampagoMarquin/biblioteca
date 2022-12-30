import {CreateLivroDto} from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { DataSource, Repository } from 'typeorm';
import {Livro} from './entities/livro.entity';
import { Injectable } from "@nestjs/common";

@Injectable()
export class LivrosRepository {
    repo: Repository<Livro>;

    constructor(private dataSource: DataSource) {
        this.repo = this.dataSource.getRepository(Livro)
    }

    findAll() {
       return this.repo.createQueryBuilder('Livro').getMany();
   }

   findById(id: number) {
       return this.repo.findOneBy({id: id});
   }

   createLivro( createLivroDto: CreateLivroDto){
       const {nome, genero, quantidade, edicao, ano, autor} = createLivroDto
       let livro = this.repo.create({
           nome,
           genero,
           quantidade,
           edicao,
           ano,
           autor
       }) 
       return this.repo.save(livro)
   }

   async updateLivro(id: number, updateLivroDto: UpdateLivroDto) {
    const {nome, genero, quantidade, edicao, ano} = updateLivroDto
       const livro = await this.findById(id)
       livro.nome = nome
       livro.genero = genero
       livro.quantidade = quantidade
       livro.edicao = edicao
       livro.ano = ano
       return this.repo.save(livro);
   }

   async updateLivroSaida(livro: Livro) {
       livro.quantidade --
       return this.repo.save(livro);
   }

   async updateLivroRetorno(livro: Livro) {
    livro.quantidade ++
    return this.repo.save(livro);
}

   removeLivro(id: number) {
       return this.repo.delete(id)
   }
   
   
}