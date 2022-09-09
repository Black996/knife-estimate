import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/createUser';
import { UpdateUserDto } from './dtos/updateUser';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dtos/ResponseUserDto';

@UseInterceptors(Serialize(ResponseUserDto))
@Controller('users')
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
        console.log('Controller started processing request');
        return this.usersService.findOneById(parseInt(id));
    }

    @Get()
    findUserByEmail(@Query('email') email:string){
        return this.usersService.findOneByEmail(email);
    }

    @Patch(":id")
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        try {
            await this.usersService.update(parseInt(id), body);
            return await this.usersService.findOneById(parseInt(id));
        } catch (err) {
            if (err instanceof Error && err.message.includes("UNIQUE constraint")) {
                throw new BadRequestException("Email is already is use!");
            } else {
                throw err
            }

        }
    }

    @Delete(":id")
    deleteUser(@Param('id') id : string){
        return this.usersService.remove(parseInt(id));
    }

}
