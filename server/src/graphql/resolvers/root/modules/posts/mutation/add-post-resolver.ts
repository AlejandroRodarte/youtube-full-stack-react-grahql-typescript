import { Resolver, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql'

import Post from '../../../../../../db/orm/entities/Post'
import PostDto from '../../../../../objects/dtos/posts/post-dto'
import AddPostInput from './../../../../../args/resolvers/root/modules/posts/mutation/inputs/add-post-input'
import AddPostArgsSchema from '../../../../../args/resolvers/root/modules/posts/mutation/schemas/add-post-args-schema'
import objects from '../../../../../objects/resolvers/modules/posts/mutation/add-post'
import responses from '../../../../.././../constants/graphql/responses'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class RootAddPostResolver {
  @Mutation(() => objects.AddPostResponse)
  @UseMiddleware(
    generatedMiddlewares.Auth({ isApplicationResponse: true, checkUserOnDatabase: true }),
    generatedMiddlewares.ValidateArgs(AddPostArgsSchema)
  )
  async addPost (
    @Arg('namespace', () => String) namespace: string,
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
      const postDto = PostDto.fromPostEntity(post)

      const response =
        new objects
          .AddPostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_CREATED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_CREATED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_CREATED].code,
            namespace,
            new objects.AddPostData(postDto)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .AddPostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_ADD_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_ADD_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.MUTATION_ADD_POST_ERROR].code,
          namespace
        )
    }
  }
}
