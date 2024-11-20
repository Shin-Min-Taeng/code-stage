import GithubRepositoryEntity from "./githubrepository.entity";
import GithubrepositoryResponseDto from "../../../shared/src/github/dto/githubrepository.response.dto";

export class GithubMapper {
    static toResponse(githubrepository: GithubRepositoryEntity){
        const response = new GithubrepositoryResponseDto();
        response.id = githubrepository.id;
        response.name = githubrepository.name;
        response.description = githubrepository.description;
        response.url = githubrepository.url;
        response.thumbnailImg = githubrepository.thumbnailImg;
        return response;
    }

    static toResponseList(githubrepositories: GithubRepositoryEntity[]){
        return githubrepositories.map(
            (githubrepository: GithubRepositoryEntity) =>
                this.toResponse(githubrepository)
        )
    }
}