import { IsNotEmpty, IsString } from 'class-validator';

export default class RegisterReviewDto {
  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsString()
  filePath!: string;

  @IsNotEmpty()
  lineNumber!: number;

}
