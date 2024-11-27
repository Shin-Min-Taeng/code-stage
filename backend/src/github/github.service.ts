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
import GithubDirectory from "../../../shared/src/github/dto/github.tree.response.dto";
// import GithubDirectory from "../../../shared/src/github/dto/github.tree.response.dto";

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
    ): Promise<BaseResponse> {
        const githubRepository: GithubRepositoryEntity =
            await this.githubRepositoryRepository.getById(repositoryId);
        const {stdout} = await execPromise(`docker exec container_${githubRepository.id} cat ${path}`);
        return {
            status: 200,
            message: '깃허브 파일 조회 성공',
            data: stdout.trim()
        };
    }

    public async getTree(repositoryId: number): Promise<BaseResponse> {
        const githubRepository: GithubRepositoryEntity =
            await this.githubRepositoryRepository.getById(repositoryId);

        const containerName = `container_${githubRepository.id}`;
        const { stdout, stderr } = await execPromise(`docker exec ${containerName} sh -c "tree -J ."`);

        if (stderr) {
            return {
                status: 500,
                message: 'Error occurred while retrieving the file tree',
                data: null,
            };
        }

        // stdout은 JSON 문자열로 반환되므로 파싱
        const fileTree: any[] = JSON.parse(stdout);

        // 파일 트리 변환 함수
        const transformToDirectoryTree = (item: any): GithubDirectory => {
            const directory: GithubDirectory = {
                type: item.type === 'directory' ? 'directory' : 'file',
                name: item.name,
            };

            // 파일인 경우 contents는 없으므로, 디렉터리만 contents를 가짐
            if (item.type === 'directory' && item.contents) {
                directory.contents = item.contents.map(transformToDirectoryTree); // 재귀적으로 변환
            }

            return directory;
        };

        // 반환할 디렉터리 트리
        const directoryTree: GithubDirectory[] = fileTree.map(transformToDirectoryTree);

        return {
            status: 200,
            message: '깃허브 파일 트리 조회 성공',
            data: directoryTree,
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
