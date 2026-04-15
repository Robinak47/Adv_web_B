
import { IsEmail, IsNotEmpty, IsEnum } from "class-validator";
import { Role } from "../users/users.entity";
export class UserRegistrationDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}