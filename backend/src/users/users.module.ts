import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserFollowers } from 'src/entities/user-followers.entity';
import { FollowersModule } from 'src/followers/followers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserFollowers]),
    FollowersModule,
    PassportModule,
  ],
  providers: [UsersService, LocalStrategy, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
