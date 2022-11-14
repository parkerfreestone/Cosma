import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostCreationDto } from 'dto/posts/post-create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPostsForUser(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id });

    if (!user) {
      throw new BadRequestException();
    }

    return await this.postsService.findAllForUser({ userId: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() postPayload: PostCreationDto) {
    return this.postsService.create(postPayload);
  }
}
