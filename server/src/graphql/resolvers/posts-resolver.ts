import { Resolver, Query, Ctx, Arg, Int, Mutation, UseMiddleware } from 'type-graphql'
import { wrap } from '@mikro-orm/core'

import { AddPostInput, EditPostInput } from '../args/inputs/mutation/posts'
import PostsClasses from '../objects/responses/posts'
import { ApplicationContext } from '../../types/graphql'
import { Post } from '../../db/orm/entities/post'
import ValidateArgs from '../../generator/graphql/middleware/validate-args'
import { AddPostArgsSchema, EditPostArgsSchema, DeletePostArgsSchema } from '../args/schemas/mutation/posts'
import { PostArgsSchema } from '../args/schemas/query/posts'
import * as PostsSymbols from '../constants/responses/symbols/posts'
import postsPayloads from '../constants/responses/payloads/posts'
@Resolver()
export default class PostsResolver {
  @Query(() => PostsClasses.responses.GetPostsResponse)
  async posts (
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const posts = await db.find(
        Post,
        {}
      )

      const response =
        new PostsClasses
          .responses
          .GetPostsResponse(
            postsPayloads.success[PostsSymbols.POSTS_FETCHED].httpCode,
            postsPayloads.success[PostsSymbols.POSTS_FETCHED].code,
            postsPayloads.success[PostsSymbols.POSTS_FETCHED].message,
            new PostsClasses
              .data
              .GetPostsData(posts)
          )

      return response
    } catch (e) {
      return new PostsClasses
        .responses
        .GetPostsResponse(
          postsPayloads.error[PostsSymbols.QUERY_POSTS_ERROR].httpCode,
          postsPayloads.error[PostsSymbols.QUERY_POSTS_ERROR].code,
          postsPayloads.error[PostsSymbols.QUERY_POSTS_ERROR].message
        )
    }
  }

  @Query(() => PostsClasses.responses.GetPostResponse)
  @UseMiddleware(ValidateArgs(PostArgsSchema))
  async post (
    @Arg('id', () => Int) id: number,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const post = await db.findOne(
        Post,
        { id }
      )

      if (!post) {
        return new PostsClasses
          .responses
          .GetPostResponse(
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].httpCode,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].code,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].message
          )
      }

      const response =
        new PostsClasses
          .responses
          .GetPostResponse(
            postsPayloads.success[PostsSymbols.POST_FETCHED].httpCode,
            postsPayloads.success[PostsSymbols.POST_FETCHED].code,
            postsPayloads.success[PostsSymbols.POST_FETCHED].message,
            new PostsClasses
              .data
              .GetPostData(post)
          )

      return response
    } catch (e) {
      return new PostsClasses
        .responses
        .GetPostResponse(
          postsPayloads.error[PostsSymbols.QUERY_POST_ERROR].httpCode,
          postsPayloads.error[PostsSymbols.QUERY_POST_ERROR].code,
          postsPayloads.error[PostsSymbols.QUERY_POST_ERROR].message
        )
    }
  }

  @Mutation(() => PostsClasses.responses.AddPostResponse)
  @UseMiddleware(ValidateArgs(AddPostArgsSchema))
  async addPost (
    @Arg('data', () => AddPostInput) data: AddPostInput,
    @Ctx() { db }: ApplicationContext
  ) {
    const post = db.create(
      Post,
      data
    )

    try {
      await db.persistAndFlush(post)

      const response =
        new PostsClasses
          .responses
          .AddPostResponse(
            postsPayloads.success[PostsSymbols.POST_CREATED].httpCode,
            postsPayloads.success[PostsSymbols.POST_CREATED].code,
            postsPayloads.success[PostsSymbols.POST_CREATED].message,
            new PostsClasses
              .data
              .AddPostData(post)
          )

      return response
    } catch (e) {
      return new PostsClasses
        .responses
        .AddPostResponse(
          postsPayloads.error[PostsSymbols.MUTATION_ADD_POST_ERROR].httpCode,
          postsPayloads.error[PostsSymbols.MUTATION_ADD_POST_ERROR].code,
          postsPayloads.error[PostsSymbols.MUTATION_ADD_POST_ERROR].message
        )
    }
  }

  @Mutation(() => PostsClasses.responses.EditPostResponse)
  @UseMiddleware(ValidateArgs(EditPostArgsSchema))
  async editPost (
    @Arg('id', () => Int) id: number,
    @Arg('data', () => EditPostInput) data: EditPostInput,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const post = await db.findOne(
        Post,
        { id }
      )

      if (!post) {
        return new PostsClasses
          .responses
          .EditPostResponse(
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].httpCode,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].code,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].message
          )
      }

      const updatedPost = wrap(post).assign({ ...data })
      await db.persistAndFlush(updatedPost)

      const response =
        new PostsClasses
          .responses
          .EditPostResponse(
            postsPayloads.success[PostsSymbols.POST_UPDATED].httpCode,
            postsPayloads.success[PostsSymbols.POST_UPDATED].code,
            postsPayloads.success[PostsSymbols.POST_UPDATED].message,
            new PostsClasses
              .data
              .EditPostData(updatedPost)
          )

      return response
    } catch (e) {
      return new PostsClasses
        .responses
        .EditPostResponse(
          postsPayloads.error[PostsSymbols.MUTATION_EDIT_POST_ERROR].httpCode,
          postsPayloads.error[PostsSymbols.MUTATION_EDIT_POST_ERROR].code,
          postsPayloads.error[PostsSymbols.MUTATION_EDIT_POST_ERROR].message
        )
    }
  }

  @Mutation(() => PostsClasses.responses.DeletePostResponse)
  @UseMiddleware(ValidateArgs(DeletePostArgsSchema))
  async deletePost (
    @Arg('id', () => Int) id: number,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const post = await db.findOne(
        Post,
        { id }
      )

      if (!post) {
        return new PostsClasses
          .responses
          .DeletePostResponse(
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].httpCode,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].code,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].message
          )
      }

      await db.nativeDelete(
        Post,
        { id }
      )

      const response =
        new PostsClasses
          .responses
          .DeletePostResponse(
            postsPayloads.success[PostsSymbols.POST_DELETED].httpCode,
            postsPayloads.success[PostsSymbols.POST_DELETED].code,
            postsPayloads.success[PostsSymbols.POST_DELETED].message,
            new PostsClasses
              .data
              .DeletePostData(id)
          )

      return response
    } catch (e) {
      return new PostsClasses
        .responses
        .DeletePostResponse(
          postsPayloads.error[PostsSymbols.MUTATION_DELETE_POST_ERROR].httpCode,
          postsPayloads.error[PostsSymbols.MUTATION_DELETE_POST_ERROR].code,
          postsPayloads.error[PostsSymbols.MUTATION_DELETE_POST_ERROR].message
        )
    }
  }
}
