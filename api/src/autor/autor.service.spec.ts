import { Test, TestingModule } from '@nestjs/testing';
import { AutorService } from './autor.service';

describe('AutorService', () => {
  let service: AutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutorService],
    }).compile();

    service = module.get<AutorService>(AutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
