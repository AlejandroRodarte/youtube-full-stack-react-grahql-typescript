import { MiddlewareFn } from 'type-graphql'

import Post from '../../db/orm/entities/Post'
import ApplicationResponse from '../../generator/graphql/responses/application-response'

import responses from '../../graphql/constants/responses'

import { GraphQLContext } from '../../types/graphql'

const CanMutatePost: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
  { context: { req } },
  next
) => {
  const ApplicationResponseClass = class extends ApplicationResponse(
    String,
    String
  ) {}

  const input = req.input!
  let postId = -1

  switch (input.type) {
    case 'EditPostInput':
    case 'DeletePostInput':
      postId = input.payload.id
      break
    default:
      return next()
  }

  try {
    const post = await Post.findOne(postId)

    if (!post) {
      return new ApplicationResponseClass(
        responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].httpCode,
        responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].message,
        responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].code,
        req.body.operationName
      )
    }

    if (post.originalPosterId !== req.user!.id) {
      return new ApplicationResponseClass(
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.NOT_POST_OWNER].httpCode,
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.NOT_POST_OWNER].message,
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.NOT_POST_OWNER].code,
        req.body.operationName
      )
    }

    return next()
  } catch (e) {
    return new ApplicationResponseClass(
      responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_CAN_MUTATE_POST_ERROR].httpCode,
      responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_CAN_MUTATE_POST_ERROR].message,
      responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_CAN_MUTATE_POST_ERROR].code,
      req.body.operationName
    )
  }
}

export default CanMutatePost
