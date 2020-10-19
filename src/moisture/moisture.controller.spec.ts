import { Test, TestingModule } from '@nestjs/testing';
import { MoistureController } from './moisture.controller';

describe('MoistureController', () => {
  let controller: MoistureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoistureController],
    }).compile();

    controller = module.get<MoistureController>(MoistureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
