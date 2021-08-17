import { Resolver, Query, Ctx, Arg, Int, Mutation } from 'type-graphql'
import { wrap } from '@mikro-orm/core'

import { AddPostInput, EditPostInput } from '../inputs/posts'
import PostsClasses from '../objects/responses/posts'
import { ApplicationContext } from '../../types/graphql'
import { Post } from '../../db/orm/entities/post'
import generateFieldErrors from '../../util/functions/graphql/responses/generate-field-errors'

@Resolver()
export default class PostsResolver {
  @Query(() => PostsClasses.responses.GetPostsResponse)
  async posts (
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const posts = await db.find(Post, {})
      const response = new PostsClasses.responses.GetPostsResponse(200, 'Posts have been fetched.', 'POSTS_FETCHED', new PostsClasses.data.GetPostsData(posts))
      return response
    } catch (e) {
      return new PostsClasses.responses.GetPostsResponse(400, 'There was an error fetching the posts.', 'QUERY_POSTS_ERROR', undefined, [])
    }
  }

  @Query(() => PostsClasses.responses.GetPostResponse)
  async post (
    @Arg('id', () => Int) id: number,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const post = await db.findOne(Post, { id })
      if (!post) return new PostsClasses.responses.GetPostResponse(404, 'There post was not found.', 'POST_NOT_FOUND', undefined, [])
      const response = new PostsClasses.responses.GetPostResponse(200, 'Post has been fetched.', 'POST_FETCHED', new PostsClasses.data.GetPostData(post))
      return response
    } catch (e) {
      return new PostsClasses.responses.GetPostResponse(400, 'There was an error fetching the post.', 'QUERY_POST_ERROR', undefined, [])
    }
  }

  @Mutation(() => PostsClasses.responses.AddPostResponse)
  async addPost (
    @Arg('data', () => AddPostInput) data: AddPostInput,
    @Ctx() { db }: ApplicationContext
  ) {
    const fieldErrors = generateFieldErrors<AddPostInput>(data)
    if (fieldErrors.length > 0) return new PostsClasses.responses.AddPostResponse(400, 'There was validation errors while validating the post.', 'MUTATION_ADD_POST_VALIDATION_ERROR', undefined, fieldErrors)
    const post = db.create(Post, data)
    try {
      await db.persistAndFlush(post)
      const response = new PostsClasses.responses.AddPostResponse(201, 'Post created.', 'POST_CREATED', new PostsClasses.data.AddPostData(post))
      return response
    } catch (e) {
      return new PostsClasses.responses.AddPostResponse(400, 'There was an error adding the post.', 'MUTATION_ADD_POST_ERROR', undefined, [])
    }
  }

  @Mutation(() => PostsClasses.responses.EditPostResponse)
  async editPost (
    @Arg('id', () => Int) id: number,
    @Arg('data', () => EditPostInput) data: EditPostInput,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const fieldErrors = generateFieldErrors<EditPostInput>(data)
      if (fieldErrors.length > 0) return new PostsClasses.responses.EditPostResponse(400, 'There was validation errors while validating the post.', 'MUTATION_EDIT_POST_VALIDATION_ERROR', undefined, fieldErrors)
      const post = await db.findOne(Post, { id })
      if (!post) return new PostsClasses.responses.EditPostResponse(404, 'There post was not found.', 'POST_NOT_FOUND', undefined, [])
      const updatedPost = wrap(post).assign({ ...data })
      await db.persistAndFlush(updatedPost)
      const response = new PostsClasses.responses.EditPostResponse(201, 'Post updated.', 'POST_UPDATED', new PostsClasses.data.EditPostData(updatedPost))
      return response
    } catch (e) {
      return new PostsClasses.responses.EditPostResponse(400, 'There was an error editing the post.', 'MUTATION_EDIT_POST_ERROR', undefined, [])
    }
  }

  @Mutation(() => PostsClasses.responses.DeletePostResponse)
  async deletePost (
    @Arg('id', () => Int) id: number,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const post = await db.findOne(Post, { id })
      if (!post) return new PostsClasses.responses.DeletePostResponse(404, 'There post was not found.', 'POST_NOT_FOUND', undefined, [])
      await db.nativeDelete(Post, { id })
      const response = new PostsClasses.responses.DeletePostResponse(200, 'Post deleted.', 'POST_DELETED', new PostsClasses.data.DeletePostData(id))
      return response
    } catch (e) {
      return new PostsClasses.responses.DeletePostResponse(400, 'There was an error deleting the post.', 'MUTATION_DELETE_POST_ERROR', undefined, [])
    }
  }
}