import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @OneToMany(() => Post, (post) => post.comments)
  post: Post;

  @Column({ nullable: false })
  content: string;
}
