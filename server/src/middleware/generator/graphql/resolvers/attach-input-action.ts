import { MiddlewareFn } from 'type-graphql'

import { GraphQLContext, GraphQLInputs } from '../../../../types/graphql'

export default function AttachInputAction (type: GraphQLInputs.InputType, field: GraphQLInputs.ExpressInputFields = 'input') {
  const middleware: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
    { context: { req }, args },
    next
  ) => {
    if (!req.inputs) {
      req.inputs = {}
    }

    req.inputs[field] = {
      type,
      payload: args.data
    } as GraphQLInputs.InputAction

    return next()
  }

  return middleware
}
