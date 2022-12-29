import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credentials } from './dto/credentials';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/singIn')
  singIn(@Body() credentials: Credentials) : Promise<{accessToken:string}>{
    return this.authService.singIn(credentials);
  }

}
