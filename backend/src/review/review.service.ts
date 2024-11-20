import {Injectable} from '@nestjs/common';
import ReviewRepository from './review.repository';
import RegisterReviewDto from '../../../shared/src/review/dto/registerReview.dto';
import GithubRepositoryRepository from '../github/githubrepository.repository';
import GithubRepositoryEntity from '../github/githubrepository.entity';
import {ReviewEntity} from "./review.entitiy";
import BaseResponse from "../support/base.response";
import {ReviewMapper} from "./review.mapper";

@Injectable()
export class ReviewService {
    constructor(
        private readonly githubRepositoryRepository: GithubRepositoryRepository,
        private readonly reviewRepository: ReviewRepository,
    ) {
    }

    public async register(
        registerDto: RegisterReviewDto,
        githubRepositoryId: number,
    ): Promise<BaseResponse<ReviewEntity>> {
        const githubRepository: GithubRepositoryEntity =
            await this.githubRepositoryRepository.getById(githubRepositoryId);

        return {
            status: 200,
            message: '리뷰 등록 성공',
            data: await this.reviewRepository.save(
                ReviewMapper.toEntity(registerDto, githubRepository)
            ),
        };
    }

    public async modify(
        registerDto: RegisterReviewDto,
        reviewId: number,
    ): Promise<BaseResponse<undefined>> {
        const reviewEntity: ReviewEntity =
            await this.reviewRepository.getById(reviewId);
        await this.reviewRepository.modify(reviewEntity, registerDto);
        return {
            status: 200,
            message: '리뷰 수정 성공'
        };
    }

    public async delete(reviewId: number): Promise<BaseResponse<undefined>> {
        const reviewEntity: ReviewEntity =
            await this.reviewRepository.getById(reviewId);
        await this.reviewRepository.delete(reviewEntity);
        return {
            status: 200,
            message: '리뷰 삭제 성공'
        };
    }

    public async getByRepositoryId(id: number): Promise<BaseResponse> {
        const githubRepository: GithubRepositoryEntity =
            await this.githubRepositoryRepository.getById(id);
        return {
            status: 200,
            message: '레포지토리별 리뷰 조회 성공',
            data: ReviewMapper.toResponseList(await this.reviewRepository.getByGithubRepository(githubRepository))
        };
    }

}
