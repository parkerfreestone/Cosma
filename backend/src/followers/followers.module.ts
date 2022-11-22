import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollowers } from 'src/entities/user-followers.entity';
import { UserFollowersController } from './followers.controller';
import { UserFollowersService } from './followers.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserFollowers])],
  providers: [UserFollowersService],
  controllers: [UserFollowersController],
})
export class FollowersModule {}
