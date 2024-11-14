import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { Injectable, Module } from '@nestjs/common';
import { DATABASE } from '../support/dotenv';
import entities from './entities';
import GithubRepositoryRepository from "../github/githubrepository.repository";
import GithubRepositoryEntity from "../github/githubrepository.entity";
import {ReviewEntity} from "../review/review.entitiy";

@Injectable()
class DatabaseConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: DATABASE.HOST,
      port: DATABASE.PORT,
      username: DATABASE.USERNAME,
      password: DATABASE.PASSWORD,
      database: DATABASE.DATABASE,
      entities: entities,
      synchronize: false,
    };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    })
  ],
})
export class DatabaseModule {}
