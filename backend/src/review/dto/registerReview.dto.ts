import { IsNotEmpty, IsString } from 'class-validator';
import GithubRepositoryEntity from '../../github/githubrepository.entity';
import { ReviewEntity } from '../review.entitiy';

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

  toEntity(githubRepository: GithubRepositoryEntity): ReviewEntity {
    const review = new ReviewEntity();
    review.content = this.content;
    review.file_path = this.file_path;
    review.line_number = this.line_number;
    review.githubRepository = githubRepository;
    return review;
  }
}
