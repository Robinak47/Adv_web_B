import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  title: string;
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  @IsNotEmpty()
  content: string;

  @IsNumber()
  userId: number;
}
