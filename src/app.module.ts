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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    entities: [User, Estimate],
    synchronize: true
  }), UsersModule, EstimatesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }
