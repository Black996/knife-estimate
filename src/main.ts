import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressSession from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(expressSession({
    secret:configService.get('SESSION_SECRET'),
    resave:false,
    saveUninitialized:false
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(3000);
}
bootstrap();
