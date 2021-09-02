import { Resolver, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql'

import Post from '../../../../db/orm/entities/Post'
import EditPostInput from '../../../args/inputs/mutation/posts/edit-post-input'
import FieldError from '../../../objects/responses/error/field-error'
import mutationSchemas from '../../../args/schemas/mutation/posts'
import postsResponses from '../../../objects/responses/posts'
import responses from '../../../constants/responses'
import middlewares from '../../../middleware'
import generatedMiddlewares from '../../../../generator/graphql/middleware'
import { GraphQLContext } from '../../../../types/graphql'
import { DBRawEntities } from '../../../../types/db'

@Resolver()
export default class EditPostResolver {
  @Mutation(() => postsResponses.mutation.responses.EditPostResponse)
  @UseMiddleware(
    middlewares.Auth,
    generatedMiddlewares.AttachInputAction('EditPostInput'),
    middlewares.CanMutatePost,
    generatedMiddlewares.ValidateArgs(mutationSchemas.EditPostArgsSchema)
  )
  async editPost (
    @Arg('data', () => EditPostInput) data: EditPostInput,
    @Ctx() { db, req }: GraphQLContext.ApplicationContext
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
        return new postsResponses
          .mutation
          .responses
          .EditPostResponse(
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].httpCode,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].message,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].code,
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

      const updatedPost = Post.create(rawPost as DBRawEntities.UpdatePostRawEntity)

      const response =
        new postsResponses
          .mutation
          .responses
          .EditPostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_UPDATED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_UPDATED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_UPDATED].code,
            req.body.operationName,
            new postsResponses
              .mutation
              .data
              .EditPostData(updatedPost)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new postsResponses
        .mutation
        .responses
        .EditPostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_EDIT_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_EDIT_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_EDIT_POST_ERROR].code,
          req.body.operationName
        )
    }
  }
}
