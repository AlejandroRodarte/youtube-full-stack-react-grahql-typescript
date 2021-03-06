import { MiddlewareFn } from 'type-graphql'

import Post from '../../../../../../db/orm/entities/Post'
import ApplicationResponse from '../../../../../../generator/graphql/objects/application-response'

import responses from '../../../../../../constants/graphql/responses'

import { GraphQLContext } from '../../../../../../types/graphql'

const CanMutatePost: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
  { context: { req }, args },
  next
) => {
  const ApplicationResponseClass = class extends ApplicationResponse(
    String,
    String
  ) {}

  const input = req.inputs!['posts/canMutatePost']!
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
        args.namespace
      )
    }

    if (post.originalPosterId !== req.user!.id) {
      return new ApplicationResponseClass(
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.NOT_POST_OWNER].httpCode,
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.NOT_POST_OWNER].message,
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.NOT_POST_OWNER].code,
        args.namespace
      )
    }

    return next()
  } catch (e) {
    if (process.env.LOG_ERRORS === 'true') console.error(e)
    return new ApplicationResponseClass(
      responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_CAN_MUTATE_POST_ERROR].httpCode,
      responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_CAN_MUTATE_POST_ERROR].message,
      responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_CAN_MUTATE_POST_ERROR].code,
      args.namespace
    )
  }
}

export default CanMutatePost
