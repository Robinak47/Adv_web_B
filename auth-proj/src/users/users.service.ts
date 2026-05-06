import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UserRegistrationDto } from 'src/auth/user-registration.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  public async create(userRegistrationDTO: UserRegistrationDto) {
    const user = this.usersRepository.create(userRegistrationDTO);
    return await this.usersRepository.save(user);
  }

  public async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  public async findById(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  public async findAll() {
    return await this.usersRepository.find();
  }
}
