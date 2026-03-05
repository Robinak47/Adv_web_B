import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { ParamDto } from './dto/param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getUsers(): String {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param() paramDto: ParamDto): String {
    return this.userService.getUserById(paramDto.id);
  }

  @Get(':id/:postId')
  getUserPosts(
    @Param('id', ParseIntPipe) id: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Query('name', new DefaultValuePipe('tom')) name?: string,
  ): String {
    if (name != undefined) {
      return `user posts for user ${id} and post ${postId} with name ${name}`;
    } else {
      return `user posts for user ${id} and post ${postId}`;
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): string {
    console.log(createUserDto);
    return `create user with name ${createUserDto.name}, email ${createUserDto.email}, age ${createUserDto.age} and password ${createUserDto.password}`;
  }

  @Put(':id')
  updateUser(): String {
    return 'update user';
  }

  @Patch(':id')
  updateUserPartially(@Body() partialUpdateUser: PartialUpdateUserDto): String {
    return 'update user partially';
  }

  @Delete(':id')
  deleteUser(): String {
    return 'delete user';
  }
}
