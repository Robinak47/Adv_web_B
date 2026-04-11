import { BadRequestException, Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profiles } from './profiles.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from '../users/users.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profiles)
    private profilesRepository: Repository<Profiles>,
    private readonly usersService: UsersService,
  ) {}

  public async createProfile(createProfileDto: CreateProfileDto) {
    let user = await this.usersService.getUserById(createProfileDto.usersId);

    if (user != null) {
      const profile = this.profilesRepository.create({
        ...createProfileDto,
        users: user,
      });

      return await this.profilesRepository.save(profile);
    } else {
      throw new BadRequestException('User Not Found');
    }
  }

  public async deleteProfile(id: number) {
    let result = (await this.profilesRepository.delete(id)).affected;
    if (result != null && result > 0) {
      return 'Profile Deleted Successfully';
    } else {
      throw new BadRequestException('Profile not found');
    }
  }
}
