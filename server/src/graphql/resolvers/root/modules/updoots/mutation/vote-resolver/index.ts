import { Resolver, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql'
import { QueryFailedError } from 'typeorm'

import VoteInput from '../../../../../../args/resolvers/root/modules/updoots/mutation/inputs/vote-input'
import VoteArgsSchema from '../../../../../../args/resolvers/root/modules/updoots/mutation/schemas/vote-args-schema'
import FieldError from './../../../../../../objects/common/error/field-error'
import objects from '../../../../../../objects/resolvers/modules/updoots/mutation/vote'
import responses from '../../../../../../../constants/graphql/responses'
import generatedMiddlewares from '../../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../../types/graphql'
import updootTransaction from './updoot-transaction'

@Resolver()
export default class VoteResolver {
  @Mutation(() => objects.VoteResponse)
  @UseMiddleware(
    generatedMiddlewares.Auth({ isApplicationResponse: true, checkUserOnDatabase: false }),
    generatedMiddlewares.ValidateArgs(VoteArgsSchema)
  )
  async vote (
    @Arg('namespace', () => String) namespace: string,
    @Arg('data', () => VoteInput) data: VoteInput,
    @Ctx() { req, db }: GraphQLContext.ApplicationContext
  ) {
    try {
      const response = await db.transaction(updootTransaction({
        userId: req.session.userId!,
        input: data,
        namespace
      }))

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)

      if (e instanceof QueryFailedError && e.constraint) {
        return new objects
          .VoteResponse(
            responses.payloads.constraintPayloads[e.constraint].httpCode,
            responses.payloads.constraintPayloads[e.constraint].message,
            responses.payloads.constraintPayloads[e.constraint].code,
            namespace,
            undefined,
            [
              new FieldError(
                responses.payloads.constraintPayloads[e.constraint].fieldError.path,
                responses.payloads.constraintPayloads[e.constraint].fieldError.type,
                responses.payloads.constraintPayloads[e.constraint].fieldError.label,
                responses.payloads.constraintPayloads[e.constraint].fieldError.message
              )
            ]
          )
      }

      return new objects
        .VoteResponse(
          responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.VOTE_ERROR].httpCode,
          responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.VOTE_ERROR].message,
          responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.VOTE_ERROR].code,
          namespace
        )
    }
  }
}
