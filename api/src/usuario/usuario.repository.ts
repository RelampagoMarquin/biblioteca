import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';

@CustomRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario>{

    findAll() {
        return this.createQueryBuilder('Usuario').getMany();
    }

    findById(id) {
        return this.findOne(id);
    }

    createUsuario( createUsuarioDto: CreateUsuarioDto){
        const {nome, email, senha} = createUsuarioDto
        let usuario = this.create({
            nome,
            email,
            senha
        })
        return this.save(usuario)
    }

    async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        const {nome, email, senha} = updateUsuarioDto
        const usuario = await this.findById(id)
        usuario.email = email
        usuario.nome = nome
        usuario.senha = senha
        return this.save(usuario);
    }

    removeUsuario(id: number) {
        return this.delete(id)
    } 
}