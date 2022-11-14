import { IsString, IsNotEmpty, MinLength, IsUUID } from 'class-validator';

export class PostCreationDto {
  @IsUUID()
  userId: string;

  @IsString()
  content: string;
}
