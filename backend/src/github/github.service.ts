import {Injectable, Logger} from '@nestjs/common';
import GithubRepositoryRepository from './githubrepository.repository';
import RegisterGithubrepositoryDto from '../../../shared/src/github/dto/registerGithubrepository.dto';
import BaseResponse from '../support/base.response';
import GithubRepositoryEntity from './githubrepository.entity';
import {execPromise} from '../support/exec.promise';
import {GithubMapper} from "./github.mapper";
import {GraphQLClient} from "graphql-request";
import {GITHUB} from "../support/dotenv";
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class GithubService {
    graphqlClient: GraphQLClient = new GraphQLClient(GITHUB.API_URL, {
        headers: {
            Authorization: `Bearer ${GITHUB.TOKEN}`,
        }
    });

    constructor(
        private readonly githubRepositoryRepository: GithubRepositoryRepository
    ) {
    }

    public async register(
        dto: RegisterGithubrepositoryDto,
    ): Promise<BaseResponse> {

        const [orgName, repoName] = dto.name.split('/');
        const query = readFileSync(join(__dirname, 'github.query.graphql'), 'utf-8');
        const variables = {
            orgName,
            repoName,
        };
        try {
            const data = await this.graphqlClient.request<GitHubRepositoryGraphqlResponse>(query, variables);
            dto.url = data.repository.url;
            dto.thumbnailImg = data.repository.owner.avatarUrl
            await this.githubRepositoryRepository.save(dto);
            return {
                status: 200,
                message: '깃허브 레포지토리 등록 성공'
            };
        } catch (error) {
            throw new Error(`Failed to fetch repository details: ${error.message}`);
        }
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
        const {stdout} = await execPromise(buildCommand);
        return {
            status: 200,
            message: '깃허브 파일 조회 성공',
            data: stdout.trim()
        };
    }

    public async getTree(repositoryId: number): Promise<BaseResponse> {
        const githubRepository: GithubRepositoryEntity =
            await this.githubRepositoryRepository.getById(repositoryId);
        const {stdout} = await execPromise(
            `docker exec ${githubRepository.id} tree -J /app/repository`,
        );
        return {
            status: 200,
            message: '깃허브 파일 트리 조회 성공',
            data: JSON.parse(stdout),
        }
    }

    public async getById(id: number): Promise<BaseResponse> {
        return {
            status: 200,
            message: 'id로 깃허브 레포지토리 조회 성공',
            data: GithubMapper.toResponse(await this.githubRepositoryRepository.getById(id))
        };
    }

    public async getAll() {
        return {
            status: 200,
            message: '깃허브 레포지토리 조회 성공',
            data: GithubMapper.toResponseList(await this.githubRepositoryRepository.getAll()),
        }
    }

    public async modify(
        id: number,
        registerDto: RegisterGithubrepositoryDto,
    ): Promise<BaseResponse> {
        const githubrepository = await this.githubRepositoryRepository.getById(id);
        await this.githubRepositoryRepository.update(githubrepository, registerDto);
        return {
            status: 200,
            message: '깃허브 레포지토리 수정 성공'
        };
    }

    public async delete(id: number): Promise<BaseResponse> {
        const githubrepository = await this.githubRepositoryRepository.getById(id);
        return {
            status: 200,
            message: '깃허브 레포지토리 삭제 성공',
            data: this.githubRepositoryRepository.remove(githubrepository)
        }
    }
}
