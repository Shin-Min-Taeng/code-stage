import { IsNotEmpty, IsString } from 'class-validator';

export default class RegisterGithubrepositoryDto {
  @IsNotEmpty()
  @IsString()
  url!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  thumbnailImg!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;
}
