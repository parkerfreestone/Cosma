import { IsString, IsNotEmpty, MinLength, IsUUID } from 'class-validator';

export class PostCreationDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
