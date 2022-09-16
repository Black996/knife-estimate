import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginGuard } from './auth/login.guard';
import { CreateUserDto } from './users/dtos/createUser';
import { User } from './users/users.entity';

interface RequestWithUser extends Request {
  user:User;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Post('/auth/login')
  async login(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post('/auth/register')
  register(@Body() body: CreateUserDto){
   return this.authService.register(body) 
  }

  @Post('/auth/logout')
  logout(@Req() request: RequestWithUser){
    request.logOut((err)=>{
      if(err) return console.log('error occured: ',err);
      request.session.cookie.maxAge = 0;
    });
  }
}
