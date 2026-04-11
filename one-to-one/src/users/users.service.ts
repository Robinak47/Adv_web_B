import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({ ...createUserDto });
    return await this.usersRepository.save(user);
  }

  public async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user != null) {
      const result = (await this.usersRepository.delete(id)).affected;
      if (result != null && result > 0) {
        return 'user deleted successfully';
      } else {
        throw new BadRequestException('Something went wrong');
      }
    } else {
      throw new BadRequestException('User not Found');
    }
  }

  public async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const result = (await this.usersRepository.update(id, updateUserDto))
      .affected;

    if (result != null && result > 0) {
      return 'user updated successfully';
    } else {
      throw new BadRequestException('user not found');
    }
  }

  public async getAllUser() {
    return await this.usersRepository.find({
      relations: ['profiles'],
    });
  }

  public async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: ['profiles'],
    });

    if (user != null) {
      return user;
    } else {
      throw new BadRequestException('User Not Found');
    }
  }
}
