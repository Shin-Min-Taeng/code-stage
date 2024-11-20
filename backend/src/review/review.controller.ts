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
import RegisterReviewDto from '../../../shared/src/review/dto/registerReview.dto';
import BaseResponse from '../support/base.response';

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

  @Get()
  async getByRepositoryId(
    @Param('repository_id') id: number,
  ): Promise<BaseResponse> {
    return this.reviewService.getByRepositoryId(id);
  }
}
