import { Test, TestingModule } from '@nestjs/testing';
import { CommonHelpersService } from './common-helpers.service';

describe('CommonHelpersService', () => {
  let service: CommonHelpersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonHelpersService],
    }).compile();

    service = module.get<CommonHelpersService>(CommonHelpersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
