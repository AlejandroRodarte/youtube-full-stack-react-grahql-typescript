
import PostDto from './../../../../../../../objects/dtos/posts/post-dto'
import objects from '../../../../../../../objects/resolvers/modules/posts/query/posts'
import constants from '../../../../../../../../constants/graphql'

const generateSuccessResponse = (dtos: PostDto[], namespace: string, limit: number) => new objects
  .PostsResponse(
    constants.responses.payloads.postsPayloads.success[constants.responses.symbols.PostsSymbols.POSTS_FETCHED].httpCode,
    constants.responses.payloads.postsPayloads.success[constants.responses.symbols.PostsSymbols.POSTS_FETCHED].message,
    constants.responses.payloads.postsPayloads.success[constants.responses.symbols.PostsSymbols.POSTS_FETCHED].code,
    namespace,
    new objects.PostsData(
      dtos.slice(0, limit),
      dtos.length === limit + 1
    )
  )

export default generateSuccessResponse
