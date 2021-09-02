import { Resolver, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql'

import Post from '../../../../db/orm/entities/Post'
import DeletePostInput from '../../../args/inputs/mutation/posts/delete-post-input'
import FieldError from '../../../objects/responses/error/field-error'
import mutationSchemas from '../../../args/schemas/mutation/posts'
import postsResponses from '../../../objects/responses/posts'
import responses from '../../../constants/responses'
import middlewares from '../../../middleware'
import generatedMiddlewares from '../../../../generator/graphql/middleware'
import { GraphQLContext } from '../../../../types/graphql'

@Resolver()
export default class DeletePostResolver {
  @Mutation(() => postsResponses.mutation.responses.DeletePostResponse)
  @UseMiddleware(
    middlewares.Auth,
    generatedMiddlewares.AttachInputAction('DeletePostInput'),
    middlewares.CanMutatePost,
    generatedMiddlewares.ValidateArgs(mutationSchemas.DeletePostArgsSchema)
  )
  async deletePost (
    @Arg('data', () => DeletePostInput) data: DeletePostInput,
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    try {
      const { affected } = await Post.delete(data.id)

      if (affected === 0) {
        return new postsResponses
          .mutation
          .responses
          .DeletePostResponse(
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

      const response =
        new postsResponses
          .mutation
          .responses
          .DeletePostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_DELETED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_DELETED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_DELETED].code,
            req.body.operationName,
            new postsResponses
              .mutation
              .data
              .DeletePostData(data.id)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new postsResponses
        .mutation
        .responses
        .DeletePostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_DELETE_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_DELETE_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_DELETE_POST_ERROR].code,
          req.body.operationName
        )
    }
  }
}
