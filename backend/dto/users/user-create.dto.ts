import { MinLength, IsString, IsNotEmpty } from 'class-validator';

export class UserCreationDto {
  @MinLength(5)
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @MinLength(8)
  @IsString()
  password: string;
}
