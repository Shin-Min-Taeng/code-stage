import RegisterGithubrepositoryDto from "shared/src/github/dto/registerGithubrepository.dto";
import customAxios from "./customAxios";
import BaseResponse from "shared/dist/support/base.response";
import GithubrepositoryResponseDto from "shared/dist/github/dto/githubrepository.response.dto";
import GithubDirectory from "shared/dist/github.tree.response.dto";
import GithubFileResponseDto from "shared/dist/github/dto/github.file.response.dto";

class GithubrepositoryRepo {
    PATH = 'github-repository'
    async register(req: RegisterGithubrepositoryDto): Promise<BaseResponse> {
        return (await customAxios.post(`${this.PATH}`, req)).data;
    }

    async modify(id: number, req: RegisterGithubrepositoryDto): Promise<BaseResponse> {
        return (await customAxios.patch(`${this.PATH}/${id}`, req)).data;
    }

    async delete(id: number): Promise<BaseResponse> {
        return (await customAxios.delete(`${this.PATH}/${id}`)).data;
    }

    async getFile(id: number, path: string): Promise<BaseResponse<GithubFileResponseDto>> {
        return (await customAxios.get(`${this.PATH}/${id}/path/${path}`)).data;
    }

    async get(id: number): Promise<BaseResponse<GithubrepositoryResponseDto>> {
        return (await customAxios.get(`${this.PATH}/${id}`)).data;
    }

    async getTree(id: number): Promise<BaseResponse<GithubDirectory[]>> {
        return (await customAxios.get(`${this.PATH}/${id}/tree`)).data;
    }

    async getAll(): Promise<BaseResponse<GithubrepositoryResponseDto[]>> {
        return (await customAxios.get(`${this.PATH}`)).data;
    }
}

const repo = new GithubrepositoryRepo();
export default repo;