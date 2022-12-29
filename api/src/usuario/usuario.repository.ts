import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class UsuarioRepository{

    constructor(private dataSource: DataSource) { }

     findAll() {
        return this.dataSource.getRepository(Usuario).createQueryBuilder('Usuario').getMany();
    }

    findById(id:number) {
        return this.dataSource.getRepository(Usuario).findOneBy({id:id});
    }

    createUsuario( createUsuarioDto: CreateUsuarioDto){
        const {nome, email, senha} = createUsuarioDto
        let usuario = this.dataSource.getRepository(Usuario).create({
            nome,
            email,
            senha
        }) 
        return this.dataSource.getRepository(Usuario).save(usuario)
    }

    async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        const {nome, email, senha} = updateUsuarioDto
        const usuario = await this.findById(id)
        usuario.email = email
        usuario.nome = nome
        usuario.senha = senha
        return this.dataSource.getRepository(Usuario).save(usuario);
    }

    removeUsuario(id: number) {
        return this.dataSource.getRepository(Usuario).delete(id)
    }  
}