import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './review.entitiy';
import GithubRepositoryEntity from '../github/githubrepository.entity';
import RegisterReviewDto from './dto/registerReview.dto';

@Injectable()
export default class ReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  public save(review: ReviewEntity): Promise<ReviewEntity> {
    return this.reviewRepository.save(review);
  }

  public modify(
    reviewEntity: ReviewEntity,
    registerDto: RegisterReviewDto,
  ): Promise<ReviewEntity> {
    return this.reviewRepository.save(
      this.reviewRepository.merge(reviewEntity, registerDto),
    );
  }

  public getByGithubRepository(
    githubRepository: GithubRepositoryEntity,
  ): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({
      where: { githubRepository: githubRepository },
      order: { createdAt: 'DESC' },
    });
  }

  public delete(review: ReviewEntity) {
    this.reviewRepository.delete(review);
  }

  public getById(id: number): Promise<ReviewEntity> {
    return this.reviewRepository.findOne({
      where: { reviewId: id },
    });
  }
}
