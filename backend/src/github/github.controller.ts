import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import BaseResponse from '../support/base.response';
import {GithubService} from './github.service';
import {ApiCreatedResponse} from "@nestjs/swagger";
import RegisterGithubrepositoryDto from "../../../shared/src/github/dto/registerGithubrepository.dto";
import GithubrepositoryResponseDto from "../../../shared/src/github/dto/githubrepository.response.dto";


@Controller('github-repository')
export class GithubController {
  constructor(
      private githubService: GithubService,
) {}

  @Post()
  @ApiCreatedResponse()
  async registerGithubRepository(
    @Body() registerDto: RegisterGithubrepositoryDto,
  ): Promise<BaseResponse> {
    return this.githubService.register(registerDto);
  }

  @Patch('/:id')
  async modify(
    @Param('id') id: number,
    @Body() registerDto: RegisterGithubrepositoryDto,
  ): Promise<BaseResponse> {
    return this.githubService.modify(id, registerDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<BaseResponse> {
    return this.githubService.delete(id);
  }

  @Get('/:repositoryId/:path/:branch')
  async getFile(
    @Param('repositoryId') repositoryId: number,
    @Param('path') path: string,
    @Param('branch') branch: string,
  ): Promise<BaseResponse> {
    return this.githubService.getFile(repositoryId, path, branch);
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<BaseResponse> {
    return this.githubService.getById(id);
  }

  @Get('/:repositoryId/tree')
  async getTree(@Param('repositoryId') id: number): Promise<BaseResponse> {
    return this.githubService.getTree(id);
  }

  @Get()
  async getAll(): Promise<BaseResponse<GithubrepositoryResponseDto[]>> {
    return this.githubService.getAll();
  }
}
