import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EstimatesModule } from './estimates/estimates.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    entities: [],
    synchronize: true
  }), UsersModule, EstimatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
