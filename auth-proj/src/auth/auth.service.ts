import { UsersService } from 'src/users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRegistrationDto } from './user-registration.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async registerUser(userRegistrationDTO: UserRegistrationDto) {
    const pass = userRegistrationDTO.password;
    const hashedPass = await bcrypt.hash(pass, 10);
    userRegistrationDTO.password = hashedPass;
    return await this.userService.create(userRegistrationDTO);
  }

  public async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async findAllUsers() {
    return await this.userService.findAll();
  }

  public async findUserById(id: number) {
    return await this.userService.findById(id);
  }
}
