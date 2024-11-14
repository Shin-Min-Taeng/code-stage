import { Injectable } from '@nestjs/common';
import ReviewRepository from './review.repository';
import RegisterReviewDto from './dto/registerReview.dto';
import GithubRepositoryRepository from '../github/githubrepository.repository';
import BaseResponse from '../support/base.response';
import GithubRepositoryEntity from '../github/githubrepository.entity';
import {ReviewEntity} from "./review.entitiy";

@Injectable()
export class ReviewService {
  constructor(
    private readonly githubRepositoryRepository: GithubRepositoryRepository,
    private readonly reviewRepository: ReviewRepository,
  ) {}

  public async register(
    registerDto: RegisterReviewDto,
    githubRepositoryId: number,
  ): Promise<BaseResponse> {
    const githubRepository: GithubRepositoryEntity =
      await this.githubRepositoryRepository.getById(githubRepositoryId);
    return new BaseResponse(
      200,
      '리뷰 등록 성공',
      await this.reviewRepository.save(registerDto.toEntity(githubRepository)),
    );
  }

  public async modify(
    registerDto: RegisterReviewDto,
    reviewId: number,
  ): Promise<BaseResponse> {
    const reviewEntity: ReviewEntity =
      await this.reviewRepository.getById(reviewId);
    await this.reviewRepository.modify(reviewEntity, registerDto);
    return new BaseResponse(200, '리뷰 수정 성공');
  }

  public async delete(reviewId: number): Promise<BaseResponse> {
    const reviewEntity: ReviewEntity =
      await this.reviewRepository.getById(reviewId);
    await this.reviewRepository.delete(reviewEntity);
    return new BaseResponse(200, '리뷰 수정 성공');
  }

  public async getByRepositoryId(id: number): Promise<BaseResponse> {
    const githubRepository: GithubRepositoryEntity =
      await this.githubRepositoryRepository.getById(id);
    return new BaseResponse(
      200,
      '레포지토리별 리뷰 조회 성공',
      await this.reviewRepository.getByGithubRepository(githubRepository)
    );
  }
}
