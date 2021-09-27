import { Resolver, Query, Ctx, UseMiddleware, Arg } from 'type-graphql'
import PostsInput from '../../../../../../args/resolvers/root/modules/posts/query/inputs/posts-input'
import PostsArgsSchema from '../../../../../../args/resolvers/root/modules/posts/query/schemas/posts-args-schema'
import objects from '../../../../../../objects/resolvers/modules/posts/query/posts'
import constants from '../../../../../../../constants/graphql'
import generatedMiddlewares from '../../../../../../../middleware/generator/graphql/resolvers'
import sort from './sort'
import { GraphQLContext } from '../../../../../../../types/graphql'

@Resolver()
export default class RootPostsResolver {
  @Query(() => objects.PostsResponse)
  @UseMiddleware(generatedMiddlewares.ValidateArgs(PostsArgsSchema))
  async posts (
    @Arg('namespace', () => String) namespace: string,
    @Ctx() { db }: GraphQLContext.ApplicationContext,
    @Arg('data', () => PostsInput) data: PostsInput
  ) {
    const sortTypes = constants.args.posts.SortTypes

    try {
      switch (data.sort) {
        case sortTypes.NEW:
          return sort.newPostsHandler({ namespace, data }, db)
        case sortTypes.POPULAR:
          return sort.popularPostsHandler({ namespace, data }, db)
        case sortTypes.TRENDING:
          return sort.trendingPostsHandler({ namespace, data }, db)
      }
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .PostsResponse(
          constants.responses.payloads.postsPayloads.error[constants.responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].httpCode,
          constants.responses.payloads.postsPayloads.error[constants.responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].message,
          constants.responses.payloads.postsPayloads.error[constants.responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].code,
          namespace
        )
    }
  }
}
