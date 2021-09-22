
import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import User from './User'
import Post from './Post'

@Entity()
export default class Updoot extends BaseEntity {
  @PrimaryColumn()
  userId: number

  @PrimaryColumn()
  postId: number

  @Column({ type: 'int' })
  value: number

  @ManyToOne(
    () => User,
    user => user.updoots
  )
  user: User

  @ManyToOne(
    () => Post,
    post => post.updoots,
    { onDelete: 'CASCADE' }
  )
  post: Post

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date
}
