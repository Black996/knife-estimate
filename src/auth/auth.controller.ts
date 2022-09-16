import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CreateUserDto } from "src/users/dtos/createUser";
import { User } from "src/users/users.entity";
import { AuthService } from "./auth.service";
import { LoginGuard } from "./login.guard";

interface RequestWithUser extends Request {
  user:User;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post('register')
  register(@Body() body: CreateUserDto){
   return this.authService.register(body) 
  }

  @Post('logout')
  logout(@Req() request: RequestWithUser){
    request.logOut((err)=>{
      if(err) return console.error('error occured: ',err);
      request.session.cookie.maxAge = 0;
    });
  }
}