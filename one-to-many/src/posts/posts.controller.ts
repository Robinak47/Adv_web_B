import { Controller, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Body, Post, Get, Param, Put } from '@nestjs/common';
import { CreatePostsDto } from './create-posts.dto';
import { UpdatePostsDto } from './update-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  public async createPost(@Body() createPostsDto: CreatePostsDto) {
    return await this.postsService.createPost(createPostsDto);
  }

  @Get()
  public async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  public async getPostsbyId(@Param('id') id: number) {
    return await this.postsService.getPostsbyId(id);
  }

  @Delete(':id')
  public async deletePost(@Param('id') id: number) {
    return await this.postsService.deletePost(id);
  }

  @Put(':id')
  public async updatePost(
    @Param('id') id: number,
    @Body() updatePostsDto: UpdatePostsDto,
  ) {
    return await this.postsService.updatePost(id, updatePostsDto);
  }
}
