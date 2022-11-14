import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCreationDto } from 'dto/posts/post-create.dto';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postsRepo: Repository<Post>) {}

  async findOne(options: Record<string, any>): Promise<Post> {
    return await this.postsRepo.findOne({ where: options });
  }

  async findAllForUser(id: Record<string, any>): Promise<Post[]> {
    return await this.postsRepo.find({ where: id });
  }

  async create(postPayload: PostCreationDto) {
    return await this.postsRepo.create(postPayload);
  }
}
