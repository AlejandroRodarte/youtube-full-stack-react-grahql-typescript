import { MiddlewareFn } from 'type-graphql'

import { GraphQLContext, GraphQLInputs } from '../../../types/graphql'

export default function AttachInputAction (type: GraphQLInputs.InputType) {
  const middleware: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
    { context: { req }, args },
    next
  ) => {
    req.input = {
      type,
      payload: args.data
    } as GraphQLInputs.InputAction

    return next()
  }

  return middleware
}
