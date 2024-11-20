import GithubRepositoryEntity from "../github/githubrepository.entity";
import {ReviewEntity} from "./review.entitiy";
import RegisterReviewDto from "../../../shared/src/review/dto/registerReview.dto";
import ReviewResponseDto from "../../../shared/src/review/dto/review.response.dto";
import GithubrepositoryResponseDto from "../../../shared/src/github/dto/githubrepository.response.dto";

export class ReviewMapper {
    static toEntity(dto: RegisterReviewDto, githubRepository: GithubRepositoryEntity) {
        const review = new ReviewEntity();
        review.content = dto.content;
        review.file_path = dto.file_path;
        review.line_number = dto.line_number;
        review.githubRepository = githubRepository;
        return review;
    }

    static toResponse(review: ReviewEntity) {
        const response = new ReviewResponseDto();
        response.reviewId = review.reviewId;
        response.content = review.content;
        response.file_path = review.file_path;
        response.line_number = review.line_number;
        response.createdAt = review.createdAt;
        response.repositoryId = review.githubRepository.id
        return review;
    }

    static toResponseList(reviews: ReviewEntity[]){
        return reviews.map((review: ReviewEntity) => this.toResponse(review))
    }
}