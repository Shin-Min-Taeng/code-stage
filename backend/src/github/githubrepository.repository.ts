import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GithubRepositoryEntity from './githubrepository.entity';
import RegisterGithubrepositoryDto from './dto/registerGithubrepository.dto';

@Injectable()
export default class GithubRepositoryRepository {
  constructor(
    @InjectRepository(GithubRepositoryEntity)
    private readonly githubRepositoryRepository: Repository<GithubRepositoryEntity>,
  ) {}
  public save(
    registerDto: RegisterGithubrepositoryDto,
  ): Promise<GithubRepositoryEntity> {
    return this.githubRepositoryRepository.save(
      this.githubRepositoryRepository.create(registerDto),
    );
  }

  public update(
    githubrepository: GithubRepositoryEntity,
    registerDto: RegisterGithubrepositoryDto,
  ): Promise<GithubRepositoryEntity> {
    return this.githubRepositoryRepository.save(
      this.githubRepositoryRepository.merge(githubrepository, registerDto),
    );
  }

  public remove(
    githubrepository: GithubRepositoryEntity,
  ): Promise<GithubRepositoryEntity> {
    return this.githubRepositoryRepository.remove(githubrepository);
  }

  public getAll(): Promise<GithubRepositoryEntity[]> {
    return this.githubRepositoryRepository.find();
  }

  public getById(id: number): Promise<GithubRepositoryEntity> {
    return this.githubRepositoryRepository.findOne({
      where: {
        id,
      }
    });
  }
}
