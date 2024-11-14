import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import BaseResponse from '../support/base.response';
import { GithubService } from './github.service';
import RegisterGithubrepositoryDto from './dto/registerGithubrepository.dto';

@Controller('github-repository')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Post()
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

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<BaseResponse> {
    return this.githubService.getById(id);
  }

  @Get()
  async getAll(): Promise<BaseResponse> {
    return this.githubService.getAll();
  }
}
