import {RegisterGithubrepositoryDto} from "shared";
import customAxios from "./customAxios";
import BaseResponse from "shared/dist/support/base.response";

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

    async getFile(id: number, path: string, branch: string): Promise<BaseResponse> {
        return (await customAxios.get(`${this.PATH}/${id}/${path}/${branch}`)).data;
    }

    async get(id: number): Promise<BaseResponse> {
        return (await customAxios.get(`${this.PATH}/${id}`)).data;
    }

    async getTree(id: number): Promise<BaseResponse> {
        return (await customAxios.get(`${this.PATH}/tree/${id}`)).data;
    }

    async getAll(): Promise<BaseResponse> {
        return (await customAxios.get(`${this.PATH}`));
    }
}

const repo = new GithubrepositoryRepo();
export default repo;