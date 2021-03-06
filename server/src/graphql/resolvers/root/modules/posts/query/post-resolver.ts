import { Resolver, Query, Arg, UseMiddleware } from 'type-graphql'

import Post from '../../../../../../db/orm/entities/Post'
import PostDto from '../../../../../objects/dtos/posts/post-dto'
import PostInput from './../../../../../args/resolvers/root/modules/posts/query/inputs/post-input'
import PostArgsSchema from '../../../../../args/resolvers/root/modules/posts/query/schemas/post-args-schema'
import FieldError from '../../../../../objects/common/error/field-error'
import objects from '../../../../../objects/resolvers/modules/posts/query/post'
import responses from '../../../../.././../constants/graphql/responses'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'

@Resolver()
export default class RootPostResolver {
  @Query(() => objects.PostResponse)
  @UseMiddleware(generatedMiddlewares.ValidateArgs(PostArgsSchema))
  async post (
    @Arg('namespace', () => String) namespace: string,
    @Arg('data', () => PostInput) data: PostInput
  ) {
    try {
      const post = await Post.findOne(data.id)

      if (!post) {
        return new objects
          .PostResponse(
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

      const postDto = PostDto.fromPostEntity(post)

      const response =
        new objects
          .PostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_FETCHED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_FETCHED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_FETCHED].code,
            namespace,
            new objects.PostData(postDto)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .PostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POST_ERROR].code,
          namespace
        )
    }
  }
}
