import { Module } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { EmprestimoController } from './emprestimo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { EmprestimoRepository } from './emprestimo.repository';
import { LivrosModule } from 'src/livros/livros.module';
import { createClient } from 'redis';

@Module({
  imports: [TypeOrmModule.forFeature([Emprestimo]), LivrosModule],
  controllers: [EmprestimoController],
  providers: [EmprestimoService, EmprestimoRepository,
    {
      provide: 'CACHE_MANAGER',
      useFactory: async () => {
        const client = createClient({
          url: 'redis://localhost:6379'
        })
        await client.connect();
        return client;
      }
    } 
  ]
})
export class EmprestimoModule {}
