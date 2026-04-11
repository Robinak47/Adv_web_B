import { BadRequestException, Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profiles } from './profiles.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from '../users/users.entity';
import { UpdateProfileDto } from './dtos/update-profile.dto';

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

  public async getProfileById(id: number) {
    return await this.profilesRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  public async getAllProfiles() {
    return await this.profilesRepository.find({ relations: ['users'] });
  }

  public async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.getProfileById(id);

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    const result = (await this.profilesRepository.update(id, updateProfileDto))
      .affected;
    if (result == null || result <= 0) {
      throw new BadRequestException('Failed to update profile');
    }
    return await this.getProfileById(id);
  }
}
