import { IsNotEmpty, IsString } from 'class-validator';

export default class RegisterReviewDto {
  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsString()
  file_path!: string;

  @IsNotEmpty()
  line_number!: number;

  @IsNotEmpty()
  @IsString()
  description!: string;

}
