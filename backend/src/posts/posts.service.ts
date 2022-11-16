import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCreationDto } from 'dto/posts/post-create.dto';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postsRepo: Repository<Post>) {}

  async findOne(options: Record<string, any>): Promise<Post> {
    return await this.postsRepo.findOne({ where: options });
  }

  async findAllForUser(user: User): Promise<Post[]> {
    return await this.postsRepo.find({
      select: {
        id: true,
        content: true,
        comments: true,
        createdDate: true,
        modifiedDate: true,
        user: {
          id: true,
          username: true,
        },
      },
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  create(postPayload: Post): Promise<Post> {
    return this.postsRepo.save({ ...postPayload });
  }
}
