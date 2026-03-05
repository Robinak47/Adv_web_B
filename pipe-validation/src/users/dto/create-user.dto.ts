import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsInt,
  Matches,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be minimum 8 characters, at least one letter and one number',
  })
  password: string;
}
