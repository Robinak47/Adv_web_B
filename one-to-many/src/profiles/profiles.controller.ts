import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Delete,
  Param,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dtos/create-profile.dto';

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
}
