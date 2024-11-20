import GithubRepositoryEntity from "../github/githubrepository.entity";
import {ReviewEntity} from "./review.entitiy";
import RegisterReviewDto from "../../../shared/src/review/dto/registerReview.dto";

class ReviewMapper {
    static toEntity(dto: RegisterReviewDto, githubRepository: GithubRepositoryEntity) {
        const review = new ReviewEntity();
        review.content = dto.content;
        review.file_path = dto.file_path;
        review.line_number = dto.line_number;
        review.githubRepository = githubRepository;
        return review;
    }
}