import { Resolver, Query, Ctx, Arg, Int, Mutation } from 'type-graphql'
import { wrap } from '@mikro-orm/core'

import { ApplicationContext } from '../../../types/db/graphql'
import { Post } from '../../orm/entities'
import { AddPostInput, EditPostInput } from '../inputs/posts'
import PostsClasses from '../objects/responses/posts'
import ApplicationErrorResponse from '../error/application-error-response'

@Resolver()
export default class PostsResolver {
  @Query(() => PostsClasses.responses.GetPostsResponse)
  async posts (
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const posts = await db.find(Post, {})
      const response = new PostsClasses.responses.GetPostsResponse(200, 'Posts have been fetched.', new PostsClasses.data.GetPostsData(posts))
      return response
    } catch (e) {
      throw new ApplicationErrorResponse(400, 'There was an error querying the posts.', 'QUERY_POSTS_ERROR')
    }
  }

  @Query(() => PostsClasses.responses.GetPostResponse)
  async post (
    @Arg('id', () => Int) id: number,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const post = await db.findOne(Post, { id })
      if (!post) throw new ApplicationErrorResponse(404, 'Post not found.', 'POST_NOT_FOUND')
      const response = new PostsClasses.responses.GetPostResponse(200, 'Post has been fetched.', new PostsClasses.data.GetPostData(post))
      return response
    } catch (e) {
      if (e instanceof ApplicationErrorResponse) throw e
      else throw new ApplicationErrorResponse(400, 'There was an error querying the post.', 'QUERY_POST_ERROR')
    }
  }

  @Mutation(() => PostsClasses.responses.AddPostResponse)
  async addPost (
    @Arg('data', () => AddPostInput) data: AddPostInput,
    @Ctx() { db }: ApplicationContext
  ) {
    const post = db.create(Post, data)
    try {
      await db.persistAndFlush(post)
      const response = new PostsClasses.responses.AddPostResponse(201, 'Post created.', new PostsClasses.data.AddPostData(post))
      return response
    } catch (e) {
      throw new ApplicationErrorResponse(400, 'There was an error adding the post.', 'ADD_POST_ERROR')
    }
  }

  @Mutation(() => PostsClasses.responses.EditPostResponse)
  async editPost (
    @Arg('id', () => Int) id: number,
    @Arg('data', () => EditPostInput) data: EditPostInput,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const post = await db.findOne(Post, { id })
      if (!post) throw new ApplicationErrorResponse(404, 'Post not found.', 'POST_NOT_FOUND')
      const updatedPost = wrap(post).assign({ ...data })
      await db.persistAndFlush(updatedPost)
      const response = new PostsClasses.responses.EditPostResponse(201, 'Post updated.', new PostsClasses.data.EditPostData(updatedPost))
      return response
    } catch (e) {
      if (e instanceof ApplicationErrorResponse) throw e
      else throw new ApplicationErrorResponse(400, 'There was an error editing the post.', 'EDIT_POST_ERROR')
    }
  }

  @Mutation(() => PostsClasses.responses.DeletePostResponse)
  async deletePost (
    @Arg('id', () => Int) id: number,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const post = await db.findOne(Post, { id })
      if (!post) throw new ApplicationErrorResponse(404, 'Post not found.', 'POST_NOT_FOUND')
      await db.nativeDelete(Post, { id })
      const response = new PostsClasses.responses.DeletePostResponse(200, 'Post deleted.', new PostsClasses.data.DeletePostData(id))
      return response
    } catch (e) {
      if (e instanceof ApplicationErrorResponse) throw e
      else throw new ApplicationErrorResponse(400, 'There was an error deleting the post.', 'DELETE_POST_ERROR')
    }
  }
}
