import { Profiles } from 'src/profiles/profiles.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  password: string;

  @OneToOne(() => Profiles, (profiles) => profiles.users, {
    cascade: false,
    nullable: true,
  })
  profiles: Profiles;
}
