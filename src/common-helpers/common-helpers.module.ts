import { Module } from '@nestjs/common';
import { CommonHelpersService } from './common-helpers.service';

@Module({
  providers: [CommonHelpersService],
  exports: [CommonHelpersService]
})
export class CommonHelpersModule {}
