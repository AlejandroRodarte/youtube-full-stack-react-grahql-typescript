
import { Entity, BaseEntity, ManyToOne, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

import Post from './Post'

@Entity()
export default class PostPointsLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  postId: number

  @Column({ type: 'int' })
  delta: number

  @ManyToOne(
    () => Post,
    post => post.updoots,
    { onDelete: 'CASCADE' }
  )
  post: Post

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date
}
