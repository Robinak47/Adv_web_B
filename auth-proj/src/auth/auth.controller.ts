import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './user-registration.dto';
import { JwtGuard } from './jwtGuard.guard';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles.decrator';
import { Role } from 'src/users/users.entity';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userRegistrationDTO: UserRegistrationDto) {
    return await this.authService.registerUser(userRegistrationDTO);
  }

  @Post('login')
  @Public()
  async login(@Body() loginDto) {
    return await this.authService.login(loginDto);
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @Get('hello-protected')
  sayHello() {
    return 'Hello from auth controller';
  }
}
