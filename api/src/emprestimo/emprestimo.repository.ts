import { DataSource, Repository} from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { Emprestimo } from './entities/emprestimo.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { Livro } from 'src/livros/entities/livro.entity';

@Injectable()
export class EmprestimoRepository{
    repo: Repository<Emprestimo>;
    constructor(private dataSource: DataSource) {
        this.repo = this.dataSource.getRepository(Emprestimo)
     }

     findAll() {
        return this.repo.createQueryBuilder('emprestimo').getMany();
    }

    findById(id:number) {
        return this.repo.findOneBy({id:id});
    }

    async createEmprestimo( createEmprestimoDto: CreateEmprestimoDto){
        const validade = 7
        let emprestimo = this.repo.create({
            validade,
            usuario: createEmprestimoDto.usuario,
            livro: createEmprestimoDto.livro
        })
        
        return this.repo.save(emprestimo)
    }

    async updateEmprestimo(id: number) {
        const retorno = new Date
        //const {usuario, livro} = updateEmprestimoDto
        const emprestimo = await this.repo.findOneBy({
            id: id
        }) 
        emprestimo.retorno = retorno
        return this.repo.save(emprestimo);
    }

    removeEmprestimo(id: number) {
        return this.repo.delete(id)
    }  
}