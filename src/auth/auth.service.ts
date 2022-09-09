import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async validateUser(email: string,pass: string){
        const user = await this.usersService.findOneByEmail(email);

        if(user && pass == user.password){
            const { password, ...rest } = user;
            
            return rest;
        }

        return null
    }
}
