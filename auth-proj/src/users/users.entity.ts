
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Role
{
    ADMIN= 'admin',
    STUDENT= 'student',
    TEACHER= 'teacher'
}


@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    id: number;
    @Column(
        {
            type: 'varchar',
            length: 255,
            unique: true,
            nullable: false
        }
    )
    email:string;
    @Column(
        {
            type: 'varchar',
            length: 255,
            nullable: false
        }
    )
    password:string;
    @Column(
        {
            type: 'enum',
            enum: Role,
            default: Role.STUDENT
        }
    )
    role: Role;
}