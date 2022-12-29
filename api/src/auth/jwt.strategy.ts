import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Inject } from '@nestjs/common/decorators';
import { UsuarioRepository } from "src/usuario/usuario.repository";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UnauthorizedException } from "@nestjs/common/exceptions";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@Inject(UsuarioRepository)
        private readonly usuarioRepository: UsuarioRepository,){
        super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'livros'})
    }

    async validate(payload: {email:string}){
        const {email} = payload
        const user : Usuario = await this.usuarioRepository.findByEmail(email)
        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}