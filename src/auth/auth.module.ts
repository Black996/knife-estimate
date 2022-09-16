import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CommonHelpersModule } from 'src/common-helpers/common-helpers.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
    imports:[UsersModule, PassportModule,CommonHelpersModule],
    providers:[AuthService, LocalStrategy,SessionSerializer],
    controllers:[AuthController]
})
export class AuthModule {}
