import { Resolver, Query, Ctx } from 'type-graphql'

import Post from '../../../../db/orm/entities/Post'
import postsResponses from '../../../objects/responses/posts'
import responses from '../../../constants/responses'
import { GraphQLContext } from '../../../../types/graphql'

@Resolver()
export default class PostsResolver {
  @Query(() => postsResponses.query.responses.PostsResponse)
  async posts (
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    try {
      const posts = await Post.find()

      const response =
        new postsResponses
          .query
          .responses
          .PostsResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POSTS_FETCHED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POSTS_FETCHED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POSTS_FETCHED].code,
            req.body.operationName,
            new postsResponses
              .query
              .data
              .PostsData(posts)
          )

      return response
    } catch (e) {
      return new postsResponses
        .query
        .responses
        .PostsResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].code,
          req.body.operationName
        )
    }
  }
}
