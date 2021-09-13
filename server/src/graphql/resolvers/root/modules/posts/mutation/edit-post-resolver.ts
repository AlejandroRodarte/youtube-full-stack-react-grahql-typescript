import { Resolver, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql'

import Post from '../../../../../../db/orm/entities/Post'
import EditPostInput from './../../../../../args/resolvers/root/modules/posts/mutation/inputs/edit-post-input'
import EditPostArgsSchema from '../../../../../args/resolvers/root/modules/posts/mutation/schemas/edit-post-args-schema'
import FieldError from '../../../../../objects/common/error/field-error'
import objects from '../../../../../objects/resolvers/modules/posts/mutation/edit-post'
import responses from '../../../../.././../constants/graphql/responses'
import middlewares from '../../../../../../middleware/graphql/resolvers'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'
import { DBRawEntities } from '../../../../../../types/db'

@Resolver()
export default class EditPostResolver {
  @Mutation(() => objects.EditPostResponse)
  @UseMiddleware(
    middlewares.common.Auth,
    generatedMiddlewares.AttachInputAction('EditPostInput', 'posts/canMutatePost'),
    middlewares.root.modules.posts.CanMutatePost,
    generatedMiddlewares.ValidateArgs(EditPostArgsSchema)
  )
  async editPost (
    @Arg('namespace', () => String) namespace: string,
    @Arg('data', () => EditPostInput) data: EditPostInput,
    @Ctx() { db }: GraphQLContext.ApplicationContext
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
        return new objects
          .EditPostResponse(
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].httpCode,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].message,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].code,
            namespace,
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
        new objects
          .EditPostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_UPDATED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_UPDATED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_UPDATED].code,
            namespace,
            new objects
              .EditPostData(updatedPost)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .EditPostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_EDIT_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_EDIT_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_EDIT_POST_ERROR].code,
          namespace
        )
    }
  }
}
