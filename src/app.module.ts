import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EstimatesModule } from './estimates/estimates.module';

@Module({
  imports: [UsersModule, EstimatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
