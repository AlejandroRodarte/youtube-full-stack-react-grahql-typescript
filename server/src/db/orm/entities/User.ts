import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, Unique, OneToMany } from 'typeorm'

import Updoot from './Updoot'
import Post from './Post'

@Entity()
@Unique('user_username_unique', ['username'])
@Unique('user_email_unique', ['email'])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  username!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @OneToMany(
    () => Post,
    post => post.originalPoster
  )
  posts: Post[]

  @OneToMany(
    () => Updoot,
    updoot => updoot.user
  )
  updoots: Updoot[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date
}
