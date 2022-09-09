import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dtos/createUser';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Request() req) {
    return {state:'login successful'};
  }

  @Post('/auth/register')
  register(@Body() body: CreateUserDto){
   return this.authService.register(body) 
  }

}

// {
//   "username": "test3",
//   "email": "test4@test.com",
//   "password": "$2b$10$muIJjn2h6/Uy6OHTdksbmONudyVt9YGJ9J6oA2IHT1Pd0h8bGaMEi",
//   "id": 11
// }