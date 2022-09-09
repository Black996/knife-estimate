import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CommonHelpersModule } from 'src/common-helpers/common-helpers.module';
import { CommonHelpersService } from 'src/common-helpers/common-helpers.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonHelpersModule],
  providers: [UsersService, CommonHelpersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
