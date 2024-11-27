import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import BaseResponse from '../support/base.response';
import RegisterReviewDto from "../../../shared/src/review/dto/registerReview.dto";

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/:githubrepositoryId')
  async register(
    @Body() registerDto: RegisterReviewDto,
    @Param('githubrepositoryId') githubrepositoryId: number,
  ): Promise<BaseResponse> {
    return this.reviewService.register(registerDto, githubrepositoryId);
  }

  @Patch('/:reviewId')
  async modify(
    @Body() registerDto: RegisterReviewDto,
    @Param('reviewId') reviewId: number,
  ): Promise<BaseResponse> {
    return this.reviewService.modify(registerDto, reviewId);
  }

  @Delete('/:reviewId')
  async delete(@Param('reviewId') reviewId: number): Promise<BaseResponse> {
    return this.reviewService.delete(reviewId);
  }

  @Get('/:repositoryId')
  async getByRepositoryId(
    @Param('repositoryId') id: number,
  ): Promise<BaseResponse> {
    return this.reviewService.getByRepositoryId(id);
  }
}
