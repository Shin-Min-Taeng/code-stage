import RegisterReviewDto from "shared/dist/review/dto/registerReview.dto";
import customAxios from "./customAxios";
import BaseResponse from "shared/dist/support/base.response";

class ReviewRepo {
    PATH = 'review';

    async register(id: number, req: RegisterReviewDto): Promise<BaseResponse> {
        return (await customAxios.post(`${this.PATH}/${id}`, req)).data;
    }
    
    async modify(id: number, req: RegisterReviewDto): Promise<BaseResponse> {
        return (await customAxios.patch(`${this.PATH}/${id}`, req)).data;
    }
    
    async delete(id: number): Promise<BaseResponse> {
        return (await customAxios.delete(`${this.PATH}/${id}`)).data;
    }
    
    async get(repositoryId: number): Promise<BaseResponse> {
        return (await customAxios.get(`${this.PATH}/${repositoryId}`)).data;
    }
}

const reviewRepo = new ReviewRepo();

export default reviewRepo;