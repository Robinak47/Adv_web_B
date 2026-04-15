import { Jwt } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwtGuard.guard';
import { RolesGuard } from './roles/roles.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard, RolesGuard],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'meow-meow',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
