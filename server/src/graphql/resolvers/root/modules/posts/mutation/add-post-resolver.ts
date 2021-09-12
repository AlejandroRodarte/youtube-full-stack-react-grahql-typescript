import { Resolver, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql'

import Post from '../../../../../../db/orm/entities/Post'
import AddPostInput from './../../../../../args/resolvers/root/modules/posts/mutation/inputs/add-post-input'
import AddPostArgsSchema from '../../../../../args/resolvers/root/modules/posts/mutation/schemas/add-post-args-schema'
import objects from '../../../../../objects/resolvers/modules/posts/mutation/add-post'
import responses from '../../../../.././../constants/graphql/responses'
import middlewares from '../../../../../../middleware/graphql/resolvers/common'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class AddPostResolver {
  @Mutation(() => objects.AddPostResponse)
  @UseMiddleware(
    middlewares.Auth,
    generatedMiddlewares.ValidateArgs(AddPostArgsSchema)
  )
  async addPost (
    @Arg('data', () => AddPostInput) data: AddPostInput,
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    const user = req.user!

    const post = Post.create({
      ...data,
      originalPosterId: user.id
    })

    try {
      await post.save()
      post.originalPoster = req.user

      const response =
        new objects
          .AddPostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_CREATED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_CREATED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_CREATED].code,
            req.body.operationName,
            new objects
              .AddPostData(post)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .AddPostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_ADD_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_ADD_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_ADD_POST_ERROR].code,
          req.body.operationName
        )
    }
  }
}
