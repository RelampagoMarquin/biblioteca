import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { TypeOrmExModule } from './typeorm-ex.module';
import { UsuarioRepository } from './usuario/usuario.repository';
import { DataSource } from 'typeorm';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { Emprestimo } from './emprestimo/entities/emprestimo.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 't3l3c0m',
    database: 'biblioteca',
    entities: [Usuario, Emprestimo],
    autoLoadEntities: true,
    synchronize: true,
  }),
  TypeOrmExModule.forCustomRepository([UsuarioRepository]),
    UsuarioModule,
    EmprestimoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
