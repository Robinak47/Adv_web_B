import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuardGuard } from 'src/custom-auth-guard/auth-guard/auth-guard.guard';

@Controller('users')
export class UsersController {
  @Get()
  @UseGuards(AuthGuardGuard)
  public getUsers(): string {
    return 'This action returns all users';
  }
}
