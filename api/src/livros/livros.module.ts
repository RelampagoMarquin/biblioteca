import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
import { LivrosRepository } from './livros.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from './entities/livro.entity';
import { AutorModule } from 'src/autor/autor.module';
import { createClient } from 'redis';

@Module({
  imports: [TypeOrmModule.forFeature([Livro]), AutorModule],
  controllers: [LivrosController],
  providers: [LivrosService, LivrosRepository, {
    provide: 'CACHE_MANAGER',
    useFactory: async () => {
      const client = createClient({
        url: 'redis://localhost:6379'
      })
      await client.connect();
      return client;
    }
  }],
  exports: [LivrosRepository]
})
export class LivrosModule {}
