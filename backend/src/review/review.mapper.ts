import GithubRepositoryEntity from "../github/githubrepository.entity";
import {ReviewEntity} from "./review.entitiy";
import RegisterReviewDto from "../../../shared/src/review/dto/registerReview.dto";
import ReviewResponseDto from "../../../shared/src/review/dto/review.response.dto";

export class ReviewMapper {
    static toEntity(dto: RegisterReviewDto, githubRepository: GithubRepositoryEntity) {
        const review = new ReviewEntity();
        review.content = dto.content;
        review.filePath = dto.filePath;
        review.lineNumber = dto.lineNumber;
        review.githubRepository = githubRepository;
        return review;
    }

    static toResponse(review: ReviewEntity) {
        const response = new ReviewResponseDto();
        response.reviewId = review.reviewId;
        response.content = review.content;
        response.filePath = review.filePath;
        response.lineNumber = review.lineNumber;
        response.createdAt = review.createdAt;
        response.repositoryId = review.githubRepository.id
        return review;
    }

    static toResponseList(reviews: ReviewEntity[]){
        return reviews.map((review: ReviewEntity) => this.toResponse(review))
    }
}