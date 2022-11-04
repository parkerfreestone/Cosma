import { MinLength, IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserCreationDto {
  @MinLength(5)
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @IsString()
  bio: string;
}
