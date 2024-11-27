import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import GithubRepositoryRepository from './githubrepository.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import GithubRepositoryEntity from './githubrepository.entity';
import {GithubCronService} from "./github.repo.docker.batch";

@Module({
  imports: [TypeOrmModule.forFeature([GithubRepositoryEntity])],
  controllers: [GithubController],
  providers: [GithubService, GithubRepositoryRepository, GithubCronService],
  exports: [GithubRepositoryRepository, GithubCronService],
})
export class GithubModule {}
