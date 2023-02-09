import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
import { LivrosRepository } from './livros.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from './entities/livro.entity';
import { AutorModule } from 'src/autor/autor.module';
import { CacheRedis } from 'src/CacheManage';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Livro]), 
    AutorModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'client'),
    }),
  ],
  controllers: [LivrosController],
  providers: [LivrosService, LivrosRepository,CacheRedis],
  exports: [LivrosRepository]
})
export class LivrosModule {}
