import {Injectable, Logger} from '@nestjs/common';
import GithubRepositoryRepository from './githubrepository.repository';
import BaseResponse from '../support/base.response';
import GithubRepositoryEntity from './githubrepository.entity';
import {execPromise} from '../support/exec.promise';
import {GithubMapper} from "./github.mapper";
import {GraphQLClient} from "graphql-request";
import {GITHUB} from "../support/dotenv";
import {readFileSync} from 'fs';
import {join} from 'path';
import RegisterGithubrepositoryDto from "../../../shared/src/github/dto/registerGithubrepository.dto";

@Injectable()
export class GithubService {
    private readonly logger = new Logger(GithubService.name);

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
        const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
        const repositoryName = dto.url.match(regex)
        const query = readFileSync(join(process.cwd(), '/src/github/github.query.graphql'), 'utf-8');
        const orgName = repositoryName[1]
        const repoName = repositoryName[2]
        try {
            const data = await this.graphqlClient.request<GitHubRepositoryGraphqlResponse>(query, {orgName: orgName, repoName: repoName});
            await this.githubRepositoryRepository.save(GithubMapper.toEntity(dto, orgName+repoName, data.repository.owner.avatarUrl));
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

        /// Docker 빌드 및 실행 명령어
        const buildCommand = `
    docker build \
    --build-arg GITHUB_REPOSITORY_URL=${githubRepository.url} \
    --build-arg BRANCH=${githubRepository.branch} \
    -t ${githubRepository.id} .;

    # 컨테이너가 이미 존재하는 경우 종료하고 삭제
    docker stop container_${githubRepository.id};
    docker rm container_${githubRepository.id};

    # 새 컨테이너 실행
    docker run -d --name container_${githubRepository.id} ${githubRepository.id} tail -f /dev/null
`;
        // 빌드 및 실행
        await execPromise(buildCommand);

        // Docker exec 명령어 실행 (bash 대신 sh 사용)
        const { stdout, stderr } = await execPromise(`docker exec container_${githubRepository.id} sh -c "tree -J ."`);

        // 성공적인 응답 반환
        return {
            status: 200,
            message: '깃허브 파일 트리 조회 성공',
            data: JSON.parse(stdout),
        };
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
