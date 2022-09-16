import { Injectable } from "@nestjs/common"
import { PassportSerializer } from "@nestjs/passport"
import { User } from "src/users/users.entity"
import { UsersService } from "src/users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService:UsersService){
    super();
  }

  serializeUser(user: User, done: (err: Error, userId: number) => void): void {
    done(null, user.id);
  }

  async deserializeUser(
    userId: string,
    done: (err: Error, payload: User) => void
  ):Promise<void> {
    const user = await this.usersService.findOneById(Number(userId));
    done(null,user);
  }
}