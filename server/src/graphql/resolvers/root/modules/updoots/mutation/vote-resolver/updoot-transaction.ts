import { EntityManager } from 'typeorm'

import Post from '../../../../../../../db/orm/entities/Post'
import User from '../../../../../../../db/orm/entities/User'
import Updoot from '../../../../../../../db/orm/entities/Updoot'
import VoteInput from '../../../../../../args/resolvers/root/modules/updoots/mutation/inputs/vote-input'
import objects from '../../../../../../objects/resolvers/modules/updoots/mutation/vote'
import responses from '../../../../../../../constants/graphql/responses'
import constants from '../../../../../../../constants/graphql/args/updoots'
import { DBRawEntities } from '../../../../../../../types/db'

interface UpdootTransactionContext {
  user: User
  input: VoteInput
  operationName: string | undefined
}

const updootTransaction = ({ user, input, operationName }: UpdootTransactionContext) => async (tm: EntityManager) => {
  let deltaPoints = 0
  let finalUpdoot: Updoot | null = null

  const updoot = await tm.findOne(Updoot, {
    where: {
      userId: user.id,
      postId: input.postId
    }
  })

  if (updoot && input.value === updoot.value) {
    return new objects
      .VoteResponse(
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.SAME_VOTE_VALUE].httpCode,
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.SAME_VOTE_VALUE].message,
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.SAME_VOTE_VALUE].code,
        operationName
      )
  }

  if (updoot && input.value === constants.VoteValueTypes.ZERO) {
    deltaPoints = -updoot.value
    await tm.remove(updoot)
    finalUpdoot = null
  }

  if (updoot && input.value !== constants.VoteValueTypes.ZERO) {
    deltaPoints = -updoot.value + input.value
    updoot.value = input.value
    await tm.save(updoot)
    finalUpdoot = updoot
  }

  if (!updoot && input.value !== constants.VoteValueTypes.ZERO) {
    const { raw: [rawUpdoot] } =
      await tm
        .getRepository(Updoot)
        .createQueryBuilder()
        .insert()
        .values({
          userId: user.id,
          ...input
        })
        .returning('*')
        .execute()

    finalUpdoot = Updoot.create(rawUpdoot as DBRawEntities.UpdateUpdootRawEntity)
    deltaPoints = input.value
  }

  if (!updoot && input.value === constants.VoteValueTypes.ZERO) {
    return new objects
      .VoteResponse(
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.VOTE_CANT_BE_ZERO].httpCode,
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.VOTE_CANT_BE_ZERO].message,
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.VOTE_CANT_BE_ZERO].code,
        operationName
      )
  }

  await tm
    .createQueryBuilder()
    .update(Post)
    .set({ points: () => `points + ${deltaPoints}` })
    .where(
      'id = :id',
      { id: input.postId }
    )
    .execute()

  const symbol =
    finalUpdoot
      ? responses.symbols.UpdootsSymbols.POST_VOTED
      : responses.symbols.UpdootsSymbols.VOTE_DELETED

  return new objects
    .VoteResponse(
      responses.payloads.updootsPayloads.success[symbol].httpCode,
      responses.payloads.updootsPayloads.success[symbol].message,
      responses.payloads.updootsPayloads.success[symbol].code,
      operationName,
      finalUpdoot ? new objects.VoteData(finalUpdoot) : undefined
    )
}

export default updootTransaction
