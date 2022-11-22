import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreationDto } from 'dto/users/user-create.dto';
import { User } from 'src/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserFollowers } from 'src/entities/user-followers.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(UserFollowers)
    private userFollowersRepo: Repository<UserFollowers>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  findOne(options: Record<string, any>): Promise<User> {
    return this.usersRepo.findOne({ where: options });
  }

  findUserFollower(options: Record<string, any>): Promise<UserFollowers> {
    return this.userFollowersRepo.findOne({ where: options });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.usersRepo.delete(id);
  }

  async create(userCreationDto: UserCreationDto) {
    if (!(await this.findOne({ username: userCreationDto.username }))) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(userCreationDto.password, salt);

      userCreationDto.username = userCreationDto.username.toLowerCase();
      userCreationDto.password = hash;

      return await this.usersRepo.save(userCreationDto);
    }
    throw new BadRequestException('Username already taken!');
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.findOne({ username });
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      return null;
    }
    return user;
  }

  async save(user: any) {
    user.username = user.username.toLowerCase();
    return await this.usersRepo.save(user);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
