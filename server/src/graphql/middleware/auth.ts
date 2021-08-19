import { MiddlewareFn } from 'type-graphql'

import { ApplicationContext } from '../../types/graphql'
import ApplicationResponse from '../../generator/graphql/responses/application-response'

const Auth: MiddlewareFn<ApplicationContext> = async (
  { context: { req } },
  next
) => {
  const ApplicationResponseClass = class extends ApplicationResponse(
    String,
    String
  ) {}

  if (req.session.userId) return next()

  return new ApplicationResponseClass(
    401,
    'Unauthorized.',
    'UNAUTHORIZED'
  )
}

export default Auth
