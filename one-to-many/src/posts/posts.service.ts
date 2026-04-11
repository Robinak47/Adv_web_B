import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostsDto } from './create-posts.dto';
import { Posts } from './posts.entity';
import { UsersService } from 'src/users/users.service';
import { UpdatePostsDto } from './update-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    private readonly usersService: UsersService,
  ) {}

  public async createPost(createPostsDto: CreatePostsDto) {
    const user = await this.usersService.getUserById(createPostsDto.userId);

    if (user != null) {
      const existingPost = await this.getPostsbyTitle(createPostsDto.title);

      if (existingPost != null) {
        throw new BadRequestException(
          `Post with title ${createPostsDto.title} already exists`,
        );
      }
      const post = this.postsRepository.create({
        ...createPostsDto,
        users: user,
      });
      return await this.postsRepository.save(post);
    } else {
      throw new BadRequestException(
        `User with id ${createPostsDto.userId} not found`,
      );
    }
  }

  public async getPostsbyTitle(title: string) {
    return await this.postsRepository.findOne({
      where: { title },
      relations: ['users'],
    });
  }

  public async getPostsbyId(id: number) {
    return await this.postsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  public async getAllPosts() {
    return await this.postsRepository.find({
      relations: ['users'],
      select: ['id', 'title'],
    });
  }

  public async deletePost(id: number) {
    const affected = (await this.postsRepository.delete(id)).affected;
    if (affected && affected > 0) {
      return { message: `Post with id ${id} deleted successfully` };
    } else {
      throw new BadRequestException(`Post with id ${id} not found`);
    }
  }

  public async updatePost(id: number, updatePostsDto: UpdatePostsDto) {
    await this.postsRepository.update(id, updatePostsDto);
    return await this.getPostsbyId(id);
  }
}
