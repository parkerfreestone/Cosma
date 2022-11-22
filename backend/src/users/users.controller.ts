import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserCreationDto } from 'dto/users/user-create.dto';
import { UserSaveDto } from 'dto/users/user-save.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserFollowers } from 'src/entities/user-followers.entity';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    userPayload: UserSaveDto,
  ) {
    const user = await this.usersService.findOne({ id });

    if (!user) {
      throw new BadRequestException();
    }

    user.bio = userPayload.bio || user.bio;

    if (userPayload.username) {
      user.username = userPayload.username;
    }

    if (userPayload.email) {
      user.email = userPayload.email;
    }

    delete user.password;
    return await this.usersService.save(user);
  }

  @Get()
  async getUsers() {
    return (await this.usersService.findAll()).map(
      ({ password, ...rest }) => rest,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/followers')
  async followUser(@Req() req: any, @Param('id') id: string) {
    const follower = await this.usersService.findOne({
      username: req.user.username,
    });
    const followee = await this.usersService.findOne({ id });

    if (!follower || !followee) {
      throw new BadRequestException(
        'One or both of the followers do not exist!',
      );
    }

    if (follower === followee) {
      throw new BadRequestException('Hmmm, you cannot follow yourself!');
    }
    const userFollowerRelation = new UserFollowers();

    userFollowerRelation.followee = followee;
    userFollowerRelation.follower = follower;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: any) {
    res.clearCookie('jwt');
    return { message: 'User Successfully Logged out.' };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id });

    if (!user) {
      throw new BadRequestException();
    }

    delete user.password;
    return user;
  }

  @Post()
  async createUser(@Body() userCreationDto: UserCreationDto): Promise<User> {
    const user = await this.usersService.create(userCreationDto);
    delete user.password;
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res({ passthrough: true }) res: any, @Req() req: any) {
    const oneHour = 60 * 60 * 1000;

    const token = await this.usersService.login(req.user);
    res.cookie('jwt', token.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: oneHour,
    });

    return {
      message: 'User successfully logged in.',
      id: req.user.id,
      expiration: new Date(new Date().getTime() + oneHour),
    };
  }
}
