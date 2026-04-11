import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authRequest = context.switchToHttp().getRequest();
    const authHeader = authRequest.headers['authorization'];
    if (!authHeader) {
      return false;
    }
    return authHeader === 'Bearer x-users-ok';
  }
}
