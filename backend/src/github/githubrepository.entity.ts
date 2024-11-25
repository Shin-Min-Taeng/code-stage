import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_github_repository')
export default class GithubRepositoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @Column()
  name: string;

  @Column()
  thumbnailImg: string;

  @Column()
  branch: string;

  @Column()
  description: string;
}
