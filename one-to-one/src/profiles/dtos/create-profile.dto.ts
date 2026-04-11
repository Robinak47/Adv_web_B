import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  name: string;
  @IsInt()
  @IsNotEmpty()
  age: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(512)
  address: string;
  @IsInt()
  @IsNotEmpty()
  usersId: number;
}
