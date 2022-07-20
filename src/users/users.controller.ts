import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser';

@Controller('auth')
export class UsersController {
    @Post()
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
    }
}
