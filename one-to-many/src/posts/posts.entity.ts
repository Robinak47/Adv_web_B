import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { on } from 'events';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  content: string;

  @ManyToOne(() => Users, (users) => users.posts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  users: Users;
}
