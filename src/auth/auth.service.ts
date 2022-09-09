import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonHelpersService } from 'src/common-helpers/common-helpers.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private commonHelpers:CommonHelpersService){}


    async validateUser(email: string,pass: string){
        const user = await this.usersService.findOneByEmail(email);

        if(!user) return null;

        const doesPasswordMatch = await this.commonHelpers.verifyPassword(pass,user.password);
        
        if(user && doesPasswordMatch){
            const { password, ...rest } = user;
            return rest;
        }

        return null
    }

    async register(userData: { username: string; email: string; password: string }){
        try{
            const password = await this.commonHelpers.encodePassword(userData.password);
            return await this.usersService.create({...userData,password});
        }catch(err){
            if(this.commonHelpers.isDuplicate(err)) throw new BadRequestException('Duplicate info!')
            else throw err;
        }
    }

}
