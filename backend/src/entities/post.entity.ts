import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity"

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @ManyToOne(() => Comment, (comment) => comment.post)
    comments: Comment[];
    
    @Column({ nullable: false })
    content: string;
}