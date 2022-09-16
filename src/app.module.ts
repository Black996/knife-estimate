import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EstimatesModule } from './estimates/estimates.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Estimate } from './estimates/estimates.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { CommonHelpersModule } from './common-helpers/common-helpers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    entities: [User, Estimate],
    synchronize: true
  }), UsersModule, EstimatesModule, AuthModule, CommonHelpersModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }
