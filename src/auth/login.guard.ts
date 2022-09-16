import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context:ExecutionContext) : Promise<boolean>{
    await super.canActivate(context)
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    return true;
  }
}