import { DataSource} from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { Emprestimo } from './entities/emprestimo.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';

@Injectable()
export class EmprestimoRepository{

    constructor(private dataSource: DataSource) { }

     findAll() {
        return this.dataSource.getRepository(Emprestimo).createQueryBuilder('emprestimo').getMany();
    }

    findById(id:number) {
        return this.dataSource.getRepository(Emprestimo).findOneBy({id:id});
    }

    async createEmprestimo( createEmprestimoDto: CreateEmprestimoDto){
        const usuario = await this.dataSource.getRepository(Usuario)
            .findOneBy({id: createEmprestimoDto.usuarioId})
        
        const validade = 7
        let emprestimo = this.dataSource.getRepository(Emprestimo).create({
            validade,
            usuario
        }) 
        return this.dataSource.getRepository(Emprestimo).save(emprestimo)
    }

    async updateEmprestimo(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
        const retorno = new Date
        const emprestimo = await this.findById(id)
            emprestimo.retorno = retorno
        return this.dataSource.getRepository(Emprestimo).save(emprestimo);
    }

    removeEmprestimo(id: number) {
        return this.dataSource.getRepository(Emprestimo).delete(id)
    }  
}