import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Autor } from './entities/autor.entity';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class AutorRepository{
    constructor(private dataSource: DataSource) { }

    findAll() {
        return this.dataSource.getRepository(Autor).createQueryBuilder('Autor').getMany();
    }

    findById(id:number) {
        return this.dataSource.getRepository(Autor).findOneBy({id:id});
    }

    createAutor( createAutorDto: CreateAutorDto){
        const {nome} = createAutorDto
        let autor = this.dataSource.getRepository(Autor).create({
            nome
        }) 
        return this.dataSource.getRepository(Autor).save(autor)
    }

    async updateAutor(id: number, updateAutorDto: UpdateAutorDto) {
        const {nome} = updateAutorDto
        const autor = await this.findById(id)

        autor.nome = nome

        return this.dataSource.getRepository(Autor).save(autor);
    }

    removeAutor(id: number) {
        return this.dataSource.getRepository(Autor).delete(id)
    }  
}