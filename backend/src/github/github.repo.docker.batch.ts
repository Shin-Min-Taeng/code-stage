import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';
import GithubRepositoryRepository from "./githubrepository.repository";

@Injectable()
export class GithubCronService {
    constructor(private readonly githubRepository: GithubRepositoryRepository) {}

    // async onApplicationBootstrap() {
    //     console.log('Application has started. Starting batch job...');
    //     await this.checkAndManageContainers(); // 배치 작업 실행
    // }

    // Docker 컨테이너가 존재하는지 확인하는 함수
    async containerExists(containerName: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            exec(`docker ps -q -f name=${containerName}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                resolve(stdout.trim() !== '');
            });
        });
    }

    // 컨테이너의 실행 시간을 구하는 함수
    async getContainerUptime(containerName: string): Promise<number> {
        return new Promise((resolve, reject) => {
            exec(`docker inspect --format '{{.State.StartedAt}}' ${containerName}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                const startTime = new Date(stdout.trim());
                const currentTime = new Date();
                const uptime = (currentTime.getTime() - startTime.getTime()) / 1000; // 초 단위로 계산
                resolve(uptime);
            });
        });
    }

    // 매 시간마다 실행되는 배치 작업
    @Cron('*/5 * * * *')
    async checkAndManageContainers(): Promise<void> {
        try {
            console.log('Starting batch job...');
            // GitHub 리포지토리 목록을 가져옴
            const githubRepositories = await this.githubRepository.getAll();

            for (const githubRepository of githubRepositories) {
                const containerName = `container_${githubRepository.id}`;

                // 컨테이너가 존재하는지 확인
                const containerExistsFlag = await this.containerExists(containerName);

                if (containerExistsFlag) {
                    // 컨테이너의 실행 시간 가져오기 (초 단위)
                    const uptime = await this.getContainerUptime(containerName);

                    // 1시간(3600초) 이상 실행된 경우 중지하고 삭제
                    if (uptime > 3600) {
                        await this.execPromise(`docker stop ${containerName}`);
                        await this.execPromise(`docker rm ${containerName}`);
                    }
                }
                const buildCommand = `
                docker build \
                --build-arg GITHUB_REPOSITORY_URL=${githubRepository.url} \
                --build-arg BRANCH=${githubRepository.branch} \
                -f Dockerfile.github \
                -t ${githubRepository.id} .;
                docker run -d --name ${containerName} ${githubRepository.id} tail -f /dev/null`;
                // 빌드 및 실행
                await this.execPromise(buildCommand);
            }
        } catch (error) {
            console.error('Error in batch job:', error);
        }
    }

    // execPromise 함수 구현 (exec의 Promise 버전)
    private execPromise(command: string): Promise<void> {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }

}
