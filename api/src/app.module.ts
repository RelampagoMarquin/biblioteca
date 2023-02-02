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

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Amanda@2022',
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
  providers: [AppService, {
    provide: 'CACHE_MANAGER',
    useFactory: async () => {
      const client = createClient({
        url: 'redis://localhost:6379'
      })
      await client.connect();
      return client;
    }
  }], 
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
