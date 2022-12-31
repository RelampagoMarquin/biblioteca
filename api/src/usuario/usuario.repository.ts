import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Injectable } from '@nestjs/common/decorators';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Emprestimo } from 'src/emprestimo/entities/emprestimo.entity';

@Injectable()
export class UsuarioRepository{
    repo: Repository<Usuario>;

    constructor(private dataSource: DataSource) {
        this.repo = this.dataSource.getRepository(Usuario)
    }

    findAll() {
        return this.repo.createQueryBuilder('Usuario').getMany();
    }

    findById(id: number ) {
        return this.repo.findOneBy({id: id});
    }

    findByEmail(email: string ) {
        return this.repo.findOneBy({email: email});
    }

    async createUsuario( createUsuarioDto: CreateUsuarioDto){
        const {nome, email, senha} = createUsuarioDto
        const salt = await bcrypt.genSalt()
        const hashpass = await bcrypt.hash(senha, salt)
        let usuario = this.dataSource.getRepository(Usuario).create({
            nome,
            email,
            senha: hashpass
        }) 
        try {
             await this.repo.save(usuario)
             return 'success'
        } catch (error) {
            if(error.code == 'ER_DUP_ENTRY'){
                throw new ConflictException('Usuario já cadastrado')
            }
        }
        
    }

    async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        const {nome, email, senha} = updateUsuarioDto
        const usuario = await this.findById(id)
        const salt = await bcrypt.genSalt()
        const hashpass = await bcrypt.hash(senha, salt)
        usuario.email = email
        usuario.nome = nome
        usuario.senha = hashpass
        return this.repo.save(usuario);
    }

    removeUsuario(id: number) {
        return this.repo.delete(id)
    }
    
    
}