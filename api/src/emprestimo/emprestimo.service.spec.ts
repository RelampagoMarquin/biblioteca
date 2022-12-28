import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimoService } from './emprestimo.service';

describe('EmprestimoService', () => {
  let service: EmprestimoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmprestimoService],
    }).compile();

    service = module.get<EmprestimoService>(EmprestimoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
