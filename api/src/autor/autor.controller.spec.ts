import { Test, TestingModule } from '@nestjs/testing';
import { AutorController } from './autor.controller';
import { AutorService } from './autor.service';

describe('AutorController', () => {
  let controller: AutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutorController],
      providers: [AutorService],
    }).compile();

    controller = module.get<AutorController>(AutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
