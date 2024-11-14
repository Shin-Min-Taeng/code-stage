import { Injectable } from '@nestjs/common';
import GithubRepositoryRepository from './githubrepository.repository';
import RegisterGithubrepositoryDto from './dto/registerGithubrepository.dto';
import BaseResponse from '../support/base.response';
import GithubRepositoryEntity from './githubrepository.entity';
import { execPromise } from '../support/exec.promise';

@Injectable()
export class GithubService {
  constructor(
    private readonly githubRepositoryRepository: GithubRepositoryRepository,
  ) {}

  public async register(
    dto: RegisterGithubrepositoryDto,
  ): Promise<BaseResponse> {
    await this.githubRepositoryRepository.save(dto);
    return new BaseResponse(200, '깃허브 레포지토리 등록 성공');
  }

  public async getFile(
    repositoryId: number,
    path: string,
    branch: string,
  ): Promise<BaseResponse> {
    const githubRepository: GithubRepositoryEntity =
      await this.githubRepositoryRepository.getById(repositoryId);
    const buildCommand = `docker build \
  --build-arg GITHUB_REPOSITORY_URL=${githubRepository.url} \
  --build-arg FILE_PATH=${path} \
  --build-arg BRANCH=${branch} \
  -t ${githubRepository.id} .`;
    const { stdout } = await execPromise(buildCommand);
    const fileContent: string = stdout.trim();
    return new BaseResponse(200, '깃허브 파일 조회 성공', fileContent);
  }

  public async getTree(repositoryId: number): Promise<BaseResponse> {
    const githubRepository: GithubRepositoryEntity =
      await this.githubRepositoryRepository.getById(repositoryId);
    const { stdout } = await execPromise(
      `docker exec ${githubRepository.id} tree -J /app/repository`,
    );
    return new BaseResponse(
      200,
      '깃허브 파일 트리 조회 성공',
      JSON.parse(stdout),
    );
  }

  public async getById(id: number): Promise<BaseResponse> {
    return new BaseResponse(
      200,
      'id로 깃허브 레포지토리 조회 성공',
      await this.githubRepositoryRepository.getById(id),
    );
  }

  public async getAll() {
    const githubrepositories: GithubRepositoryEntity[] =
      await this.githubRepositoryRepository.getAll();
    return new BaseResponse(
      200,
      '깃허브 레포지토리 조회 성공',
      githubrepositories,
    );
  }

  public async modify(
    id: number,
    registerDto: RegisterGithubrepositoryDto,
  ): Promise<BaseResponse> {
    const githubrepository = await this.githubRepositoryRepository.getById(id);
    await this.githubRepositoryRepository.update(githubrepository, registerDto);
    return new BaseResponse(200, '깃허브 레포지토리 수정 성공');
  }

  public async delete(id: number): Promise<BaseResponse> {
    const githubrepository = await this.githubRepositoryRepository.getById(id);
    return new BaseResponse(
      200,
      '깃허브 레포지토리 삭제 성공',
      this.githubRepositoryRepository.remove(githubrepository),
    );
  }
}
