import {
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserFollowers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinTable()
  followee: User;

  @ManyToOne(() => User, (user) => user.followees)
  @JoinTable()
  follower: User;
}
