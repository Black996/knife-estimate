import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser';
import { UpdateUserDto } from './dtos/updateUser';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post("signup")
    async createUser(@Body() body: CreateUserDto) {
        try {
            return await this.usersService.create(body);
        } catch (err) {
            if (err instanceof Error && err.message.includes("UNIQUE constraint")) {
                throw new BadRequestException("Email is already is use!");
            }
        }
    }

    @Get(":id")
    findUser(@Param('id') id:string){
        return this.usersService.findOneById(parseInt(id));
    }

    @Get()
    findUserByEmail(@Query('email') email:string){
        return this.usersService.findOneByEmail(email);
    }

    @Patch(":id")
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        try {
            return await this.usersService.update(parseInt(id), body);
        } catch (err) {
            if (err instanceof Error && err.message.includes("UNIQUE constraint")) {
                throw new BadRequestException("Email is already is use!");
            }

        }
    }

    @Delete(":id")
    deleteUser(@Param('id') id : string){
        return this.usersService.remove(parseInt(id));
    }

}
