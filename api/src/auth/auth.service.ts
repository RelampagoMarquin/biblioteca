import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { Credentials } from './dto/credentials';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @Inject(UsuarioRepository)
      private readonly usuarioRepository: UsuarioRepository,
      private readonly jwtSevice: JwtService
  ) {}

  async singIn (credentials: Credentials) : Promise<{accessToken:string}> {
    const {email, senha} = credentials
    const user = await this.usuarioRepository.findByEmail(email);

    if(user && (await bcrypt.compare(senha, user.senha))){
      const payload = {email}
      const accessToken : string = this.jwtSevice.sign(payload)
      return {accessToken}
    } else {
      throw new UnauthorizedException('Nâo autorizado')
    }
  }
}
