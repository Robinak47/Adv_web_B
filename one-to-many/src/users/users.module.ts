import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Profiles } from 'src/profiles/profiles.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [Profiles, TypeOrmModule.forFeature([Users])],
  exports: [UsersService],
})
export class UsersModule {}
