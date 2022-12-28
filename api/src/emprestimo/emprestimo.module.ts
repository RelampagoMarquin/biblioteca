import { Module } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { EmprestimoController } from './emprestimo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { EmprestimoRepository } from './emprestimo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Emprestimo])],
  controllers: [EmprestimoController],
  providers: [EmprestimoService, EmprestimoRepository]
})
export class EmprestimoModule {}
