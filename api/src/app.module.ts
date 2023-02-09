import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createClient } from '@redis/client';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { LivrosModule } from './livros/livros.module';
import { AutorModule } from './autor/autor.module';
import { AuthModule } from './auth/auth.module';
import { CacheRedis } from './CacheManage';
@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'sirius',
    database: 'biblioteca',
    autoLoadEntities: true,
    synchronize: true,
  }),
    UsuarioModule,
    EmprestimoModule,
    LivrosModule,
    AutorModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,CacheRedis], 
  exports: [CacheRedis]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
