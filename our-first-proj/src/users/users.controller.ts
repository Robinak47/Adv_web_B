import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getUsers(): String {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): String {
    return this.userService.getUserById(id);
  }

  @Get(':id/:postId')
  getUserPosts(
    @Param('id') id: string,
    @Param('postId') postId: string,
    @Query('name') name?: string,
  ): String {
    if (name != undefined) {
      return `user posts for user ${id} and post ${postId} with name ${name}`;
    } else {
      return `user posts for user ${id} and post ${postId}`;
    }
  }

  @Post()
  createUser(): String {
    return 'create user';
  }

  @Put(':id')
  updateUser(): String {
    return 'update user';
  }

  @Patch(':id')
  updateUserPartially(): String {
    return 'update user partially';
  }

  @Delete(':id')
  deleteUser(): String {
    return 'delete user';
  }
}
