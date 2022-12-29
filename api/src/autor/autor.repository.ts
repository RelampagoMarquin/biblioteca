import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Autor } from './entities/autor.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class AutorRepository{
    repo: Repository<Autor>;

    constructor(private dataSource: DataSource) {
        this.repo = this.dataSource.getRepository(Autor)
    }

    findAll() {
        return this.repo.createQueryBuilder('Autor').getMany();
    }

    findById(id:number) {
        return this.repo.findOneBy({id:id});
    }

    createAutor( createAutorDto: CreateAutorDto){
        const {nome} = createAutorDto
        let autor = this.repo.create({
            nome
        }) 
        return this.repo.save(autor)
    }

    async updateAutor(id: number, updateAutorDto: UpdateAutorDto) {
        const {nome} = updateAutorDto
        const autor = await this.findById(id)

        autor.nome = nome

        return this.repo.save(autor);
    }

    removeAutor(id: number) {
        return this.repo.delete(id)
    }  
}