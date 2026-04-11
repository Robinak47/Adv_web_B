import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;
  @Column({
    type: 'int',
    nullable: false,
  })
  age: number;
  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  address: string;

  @OneToOne(() => Users, (users) => users.profiles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  users: Users;
}
