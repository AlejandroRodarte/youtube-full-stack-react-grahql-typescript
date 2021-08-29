import { Resolver, Query, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql'

import { AddPostInput, EditPostInput, DeletePostInput } from '../args/inputs/mutation/posts'
import { PostInput } from '../args/inputs/query/posts'
import PostsClasses from '../objects/responses/posts'
import { ApplicationContext } from '../../types/graphql'
import { Post } from '../../db/orm/entities/post'
import ValidateArgs from '../../generator/graphql/middleware/validate-args'
import { AddPostArgsSchema, EditPostArgsSchema, DeletePostArgsSchema } from '../args/schemas/mutation/posts'
import { PostArgsSchema } from '../args/schemas/query/posts'
import * as PostsSymbols from '../constants/responses/symbols/posts'
import postsPayloads from '../constants/responses/payloads/posts'
import { FieldError } from '../objects/responses/error'
import { UpdatePostRawEntity } from '../../types/db'

@Resolver()
export default class PostsResolver {
  @Query(() => PostsClasses.responses.GetPostsResponse)
  async posts (
    @Ctx() { req }: ApplicationContext
  ) {
    try {
      const posts = await Post.find()

      const response =
        new PostsClasses
          .responses
          .GetPostsResponse(
            postsPayloads.success[PostsSymbols.POSTS_FETCHED].httpCode,
            postsPayloads.success[PostsSymbols.POSTS_FETCHED].message,
            postsPayloads.success[PostsSymbols.POSTS_FETCHED].code,
            req.body.operationName,
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
          postsPayloads.error[PostsSymbols.QUERY_POSTS_ERROR].message,
          postsPayloads.error[PostsSymbols.QUERY_POSTS_ERROR].code,
          req.body.operationName
        )
    }
  }

  @Query(() => PostsClasses.responses.GetPostResponse)
  @UseMiddleware(ValidateArgs(PostArgsSchema))
  async post (
    @Arg('data', () => PostInput) data: PostInput,
    @Ctx() { req }: ApplicationContext
  ) {
    try {
      const post = await Post.findOne(data.id)

      if (!post) {
        return new PostsClasses
          .responses
          .GetPostResponse(
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].httpCode,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].message,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].code,
            req.body.operationName,
            undefined,
            [
              new FieldError(
                'data.id',
                'db.notfound',
                'Post ID',
                'There is no post with that ID.'
              )
            ]
          )
      }

      const response =
        new PostsClasses
          .responses
          .GetPostResponse(
            postsPayloads.success[PostsSymbols.POST_FETCHED].httpCode,
            postsPayloads.success[PostsSymbols.POST_FETCHED].message,
            postsPayloads.success[PostsSymbols.POST_FETCHED].code,
            req.body.operationName,
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
          postsPayloads.error[PostsSymbols.QUERY_POST_ERROR].message,
          postsPayloads.error[PostsSymbols.QUERY_POST_ERROR].code,
          req.body.operationName
        )
    }
  }

  @Mutation(() => PostsClasses.responses.AddPostResponse)
  @UseMiddleware(ValidateArgs(AddPostArgsSchema))
  async addPost (
    @Arg('data', () => AddPostInput) data: AddPostInput,
    @Ctx() { req }: ApplicationContext
  ) {
    const post = Post.create(data)

    try {
      await post.save()

      const response =
        new PostsClasses
          .responses
          .AddPostResponse(
            postsPayloads.success[PostsSymbols.POST_CREATED].httpCode,
            postsPayloads.success[PostsSymbols.POST_CREATED].message,
            postsPayloads.success[PostsSymbols.POST_CREATED].code,
            req.body.operationName,
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
          postsPayloads.error[PostsSymbols.MUTATION_ADD_POST_ERROR].message,
          postsPayloads.error[PostsSymbols.MUTATION_ADD_POST_ERROR].code,
          req.body.operationName
        )
    }
  }

  @Mutation(() => PostsClasses.responses.EditPostResponse)
  @UseMiddleware(ValidateArgs(EditPostArgsSchema))
  async editPost (
    @Arg('data', () => EditPostInput) data: EditPostInput,
    @Ctx() { db, req }: ApplicationContext
  ) {
    try {
      const { raw: [rawPost], affected } =
        await db
          .createQueryBuilder()
          .update(Post)
          .set(data.fields)
          .where(
            'id = :id',
            { id: data.id }
          )
          .returning('*')
          .execute()

      if (affected === 0) {
        return new PostsClasses
          .responses
          .EditPostResponse(
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].httpCode,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].message,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].code,
            req.body.operationName,
            undefined,
            [
              new FieldError(
                'data.id',
                'db.notfound',
                'Post ID',
                'There is no post with that ID.'
              )
            ]
          )
      }

      const updatedPost = Post.create(rawPost as UpdatePostRawEntity)

      const response =
        new PostsClasses
          .responses
          .EditPostResponse(
            postsPayloads.success[PostsSymbols.POST_UPDATED].httpCode,
            postsPayloads.success[PostsSymbols.POST_UPDATED].message,
            postsPayloads.success[PostsSymbols.POST_UPDATED].code,
            req.body.operationName,
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
          postsPayloads.error[PostsSymbols.MUTATION_EDIT_POST_ERROR].message,
          postsPayloads.error[PostsSymbols.MUTATION_EDIT_POST_ERROR].code,
          req.body.operationName
        )
    }
  }

  @Mutation(() => PostsClasses.responses.DeletePostResponse)
  @UseMiddleware(ValidateArgs(DeletePostArgsSchema))
  async deletePost (
    @Arg('data', () => DeletePostInput) data: DeletePostInput,
    @Ctx() { req }: ApplicationContext
  ) {
    try {
      const { affected } = await Post.delete(data.id)

      if (affected === 0) {
        return new PostsClasses
          .responses
          .DeletePostResponse(
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].httpCode,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].message,
            postsPayloads.error[PostsSymbols.POST_NOT_FOUND].code,
            req.body.operationName,
            undefined,
            [
              new FieldError(
                'data.id',
                'db.notfound',
                'Post ID',
                'There is no post with that ID.'
              )
            ]
          )
      }

      const response =
        new PostsClasses
          .responses
          .DeletePostResponse(
            postsPayloads.success[PostsSymbols.POST_DELETED].httpCode,
            postsPayloads.success[PostsSymbols.POST_DELETED].message,
            postsPayloads.success[PostsSymbols.POST_DELETED].code,
            req.body.operationName,
            new PostsClasses
              .data
              .DeletePostData(data.id)
          )

      return response
    } catch (e) {
      return new PostsClasses
        .responses
        .DeletePostResponse(
          postsPayloads.error[PostsSymbols.MUTATION_DELETE_POST_ERROR].httpCode,
          postsPayloads.error[PostsSymbols.MUTATION_DELETE_POST_ERROR].message,
          postsPayloads.error[PostsSymbols.MUTATION_DELETE_POST_ERROR].code,
          req.body.operationName
        )
    }
  }
}
