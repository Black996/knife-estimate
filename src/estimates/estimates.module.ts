import { Module } from '@nestjs/common';
import { EstimatesService } from './estimates.service';
import { EstimatesController } from './estimates.controller';
import { Estimate } from './estimates.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Estimate])],
  providers: [EstimatesService],
  controllers: [EstimatesController]
})
export class EstimatesModule { }
