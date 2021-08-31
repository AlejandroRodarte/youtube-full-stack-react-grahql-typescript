import { Resolver, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql'

import Post from '../../../../db/orm/entities/Post'
import AddPostInput from '../../../args/inputs/mutation/posts/add-post-input'
import mutationSchemas from '../../../args/schemas/mutation/posts'
import postsResponses from '../../../objects/responses/posts'
import responses from '../../../constants/responses'
import middlewares from '../../../middleware'
import generatedMiddlewares from '../../../../generator/graphql/middleware'
import { GraphQLContext } from '../../../../types/graphql'

@Resolver()
export default class AddPostResolver {
  @Mutation(() => postsResponses.mutation.responses.AddPostResponse)
  @UseMiddleware(
    middlewares.Auth,
    generatedMiddlewares.ValidateArgs(mutationSchemas.AddPostArgsSchema)
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

      const response =
        new postsResponses
          .mutation
          .responses
          .AddPostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_CREATED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_CREATED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_CREATED].code,
            req.body.operationName,
            new postsResponses
              .mutation
              .data
              .AddPostData(post)
          )

      return response
    } catch (e) {
      return new postsResponses
        .mutation
        .responses
        .AddPostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_ADD_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_ADD_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_ADD_POST_ERROR].code,
          req.body.operationName
        )
    }
  }
}
