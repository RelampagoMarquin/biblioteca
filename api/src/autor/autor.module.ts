import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { AutorRepository } from './autor.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  controllers: [AutorController],
  providers: [AutorService, AutorRepository],
  exports: [AutorRepository]
})
export class AutorModule {}
