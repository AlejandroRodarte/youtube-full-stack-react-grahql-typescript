import { Resolver, Arg, Mutation, UseMiddleware } from 'type-graphql'

import Post from '../../../../../../db/orm/entities/Post'
import DeletePostInput from './../../../../../args/resolvers/root/modules/posts/mutation/inputs/delete-post-input'
import DeletePostArgsSchema from '../../../../../args/resolvers/root/modules/posts/mutation/schemas/delete-post-args-schema'
import FieldError from '../../../../../objects/common/error/field-error'
import objects from '../../../../../objects/resolvers/modules/posts/mutation/delete-post'
import responses from '../../../../.././../constants/graphql/responses'
import middlewares from '../../../../../../middleware/graphql/resolvers'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'

@Resolver()
export default class DeletePostResolver {
  @Mutation(() => objects.DeletePostResponse)
  @UseMiddleware(
    middlewares.common.Auth,
    generatedMiddlewares.AttachInputAction('DeletePostInput', 'posts/canMutatePost'),
    middlewares.root.modules.posts.CanMutatePost,
    generatedMiddlewares.ValidateArgs(DeletePostArgsSchema)
  )
  async deletePost (
    @Arg('namespace', () => String) namespace: string,
    @Arg('data', () => DeletePostInput) data: DeletePostInput
  ) {
    try {
      const { affected } = await Post.delete(data.id)

      if (affected === 0) {
        return new objects
          .DeletePostResponse(
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].httpCode,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].message,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].code,
            namespace,
            undefined,
            [
              new FieldError(
                'data.id',
                'db.not-found',
                'Post ID',
                'There is no post with that ID.'
              )
            ]
          )
      }

      const response =
        new objects
          .DeletePostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_DELETED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_DELETED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_DELETED].code,
            namespace,
            new objects
              .DeletePostData(data.id)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .DeletePostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_DELETE_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_DELETE_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_DELETE_POST_ERROR].code,
          namespace
        )
    }
  }
}
