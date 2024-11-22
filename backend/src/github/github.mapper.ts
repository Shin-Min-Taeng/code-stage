import GithubRepositoryEntity from "./githubrepository.entity";
import GithubrepositoryResponseDto from "../../../shared/src/github/dto/githubrepository.response.dto";
import RegisterGithubrepositoryDto from "../../../shared/src/github/dto/registerGithubrepository.dto";

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

    static toEntity(githubrepository: RegisterGithubrepositoryDto, name: string, thumbnailImg: string){
        const entity = new GithubRepositoryEntity();
        entity.name = name;
        entity.description = githubrepository.description;
        entity.url = githubrepository.url;
        entity.thumbnailImg = thumbnailImg;
        return entity;
    }
}