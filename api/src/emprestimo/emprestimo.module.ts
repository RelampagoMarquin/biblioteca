import { Module } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { EmprestimoController } from './emprestimo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { EmprestimoRepository } from './emprestimo.repository';
import { LivrosModule } from 'src/livros/livros.module';

@Module({
  imports: [TypeOrmModule.forFeature([Emprestimo]), LivrosModule],
  controllers: [EmprestimoController],
  providers: [EmprestimoService, EmprestimoRepository]
})
export class EmprestimoModule {}
