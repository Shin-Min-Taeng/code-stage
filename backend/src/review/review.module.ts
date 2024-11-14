import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { GithubModule } from '../github/github.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import GithubRepositoryEntity from '../github/githubrepository.entity';
import { ReviewEntity } from './review.entitiy';
import ReviewRepository from "./review.repository";

@Module({
  imports: [
    GithubModule,
    TypeOrmModule.forFeature([GithubRepositoryEntity, ReviewEntity]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
