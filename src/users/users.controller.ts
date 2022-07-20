import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        try {
            await this.usersService.create(body);
        } catch (err) {
            if (err instanceof Error && err.message.includes("UNIQUE constraint")) {
                throw new BadRequestException("Email is already is use!");
            }
        }

    }
}
