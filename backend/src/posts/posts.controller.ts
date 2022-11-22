import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Param,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Post as PostEntity } from 'src/entities/post.entity';
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

    return this.postsService.findAllForUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() postPayload: PostCreationDto, @Req() req: any) {
    const user = await this.usersService.findOne({
      username: req.user.username,
    });

    if (!user) {
      throw new BadRequestException();
    }

    if (req.user.username !== user.username) {
      throw new UnauthorizedException(
        'You cannot post on behalf of another user!',
      );
    }

    const newPost = new PostEntity();
    newPost.content = postPayload.content;
    newPost.user = user;

    const result = await this.postsService.create(newPost);
    delete result?.user;

    return result;
  }
}
