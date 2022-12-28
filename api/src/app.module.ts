import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { TypeOrmExModule } from './typeorm-ex.module';
import { UsuarioRepository } from './usuario/usuario.repository';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'cirila',
    database: 'biblioteca',
    entities: [Usuario],
    autoLoadEntities: true,
    synchronize: true,
  }),
  TypeOrmExModule.forCustomRepository([UsuarioRepository]),
    UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
