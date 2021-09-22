import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm'

import Updoot from './Updoot'
import User from './User'
import PostPointsLog from './PostPointsLog'

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  text!: string

  @Column({
    type: 'int',
    default: 0
  })
  points!: number

  @Column()
  originalPosterId: number

  @ManyToOne(
    () => User,
    user => user.posts,
    { onDelete: 'CASCADE' }
  )
  originalPoster: User

  @OneToMany(
    () => Updoot,
    updoot => updoot.post
  )
  updoots: Updoot[]

  @OneToMany(
    () => PostPointsLog,
    log => log.post
  )
  pointLogs: PostPointsLog[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date
}
