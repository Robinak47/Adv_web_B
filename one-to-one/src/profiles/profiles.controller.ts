import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  public createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.createProfile(createProfileDto);
  }

  @Delete(':id')
  public deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.deleteProfile(id);
  }

  @Get(':id')
  public getProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.getProfileById(id);
  }

  @Get()
  public getAllProfiles() {
    return this.profilesService.getAllProfiles();
  }

  @Put(':id')
  public updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfile(id, updateProfileDto);
  }
}
