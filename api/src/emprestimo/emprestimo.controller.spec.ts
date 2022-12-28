import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimoController } from './emprestimo.controller';
import { EmprestimoService } from './emprestimo.service';

describe('EmprestimoController', () => {
  let controller: EmprestimoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmprestimoController],
      providers: [EmprestimoService],
    }).compile();

    controller = module.get<EmprestimoController>(EmprestimoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
