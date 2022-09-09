import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommonHelpersService {

  isError(arg:unknown):arg is Error{
    return arg instanceof Error;
  }

  isDuplicate(arg:unknown): boolean{
   return (this.isError(arg) && arg.message.includes("UNIQUE constraint"));
  }

  async encodePassword(password:string): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
  }

  async verifyPassword(incomingPassword:string, savedHashedPassword:string): Promise<boolean>{
    return await bcrypt.compare(incomingPassword,savedHashedPassword);
  }
}