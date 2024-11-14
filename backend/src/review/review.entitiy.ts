import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import GithubRepositoryEntity from '../github/githubrepository.entity';

@Entity('tbl_review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  reviewId: number;

  @Column('text')
  content: string;

  @Column('text')
  file_path: string;

  @Column()
  line_number: number;

  @JoinColumn({ name: 'fk_github_repository_id' })
  @ManyToOne(
    () => GithubRepositoryEntity,
    (githubRepository) => githubRepository.id,
  )
  githubRepository: GithubRepositoryEntity;

  @CreateDateColumn()
  createdAt: Date;
}
