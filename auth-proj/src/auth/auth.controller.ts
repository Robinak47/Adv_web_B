import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './user-registration.dto';
import { JwtGuard } from './jwtGuard.guard';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles.decrator';
import { Role } from 'src/users/users.entity';
import { Public } from './public.decorator';
import { CurrentUser } from './current-user-decorator';
import { Users } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
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

  @Get('current-user')
  @Roles(Role.ADMIN, Role.STUDENT)
  getProfile(@CurrentUser() user: Users) {
    return user;
  }

  @Get('email')
  @Roles(Role.ADMIN, Role.STUDENT)
  getEmail(@CurrentUser('email') email: string) {
    return { email };
  }

  @Get('all-users')
  @Roles(Role.ADMIN)
  async getAllUsers() {
    return await this.authService.findAllUsers();
  }

  @Get('user/:id')
  @Roles(Role.ADMIN)
  async getUserById(@Param('id') id: number) {
    return await this.authService.findUserById(id);
  }
}
