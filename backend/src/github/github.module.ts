import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import GithubRepositoryRepository from './githubrepository.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import GithubRepositoryEntity from './githubrepository.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GithubRepositoryEntity])],
  controllers: [GithubController],
  providers: [GithubService, GithubRepositoryRepository],
  exports: [GithubRepositoryRepository],
})
export class GithubModule {}
