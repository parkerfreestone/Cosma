import { MinLength, IsString, IsEmail, IsOptional } from 'class-validator';

export class UserSaveDto {
  @IsOptional()
  @MinLength(5)
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  bio: string;
}
