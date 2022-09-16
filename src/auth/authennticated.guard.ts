import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    const isAuthenticated = request.isAuthenticated();
    if(isAuthenticated) return isAuthenticated;
    else throw new UnauthorizedException('you should be logged in!');
  }
}