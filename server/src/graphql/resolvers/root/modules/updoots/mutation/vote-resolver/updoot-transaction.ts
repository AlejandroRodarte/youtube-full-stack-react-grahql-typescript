import { EntityManager } from 'typeorm'

import Post from '../../../../../../../db/orm/entities/Post'
import PostPointsLog from '../../../../../../../db/orm/entities/PostPointsLog'
import UpdootDto from '../../../../../../objects/dtos/updoots/updoot-dto'
import FieldError from './../../../../../../objects/common/error/field-error'
import Updoot from '../../../../../../../db/orm/entities/Updoot'
import VoteInput from '../../../../../../args/resolvers/root/modules/updoots/mutation/inputs/vote-input'
import entityConstants from '../../../../../../../constants/db/orm/entities'
import objects from '../../../../../../objects/resolvers/modules/updoots/mutation/vote'
import responses from '../../../../../../../constants/graphql/responses'
import constants from '../../../../../../../constants/graphql/args/updoots'
import { DBRawEntities } from '../../../../../../../types/db'

interface UpdootTransactionContext {
  userId: number
  input: VoteInput
  namespace: string | undefined
}

const updootTransaction = ({ userId, input, namespace }: UpdootTransactionContext) => async (tm: EntityManager) => {
  let deltaPoints = 0
  let finalUpdoot: UpdootDto | null = null

  const updoot = await tm.findOne(Updoot, {
    where: {
      userId,
      postId: input.postId
    }
  })

  if (updoot && input.value === updoot.value) {
    return new objects
      .VoteResponse(
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.SAME_VOTE_VALUE].httpCode,
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.SAME_VOTE_VALUE].message,
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.SAME_VOTE_VALUE].code,
        namespace,
        undefined,
        [
          new FieldError(
            'data.value',
            'server.same-value',
            'Updoot value',
            'Updoot value is the same as the current one'
          )
        ]
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
    finalUpdoot = UpdootDto.fromUpdootEntity(updoot)
  }

  if (!updoot && input.value !== constants.VoteValueTypes.ZERO) {
    const { raw: [rawUpdoot] } =
      await tm
        .getRepository(Updoot)
        .createQueryBuilder()
        .insert()
        .values({
          userId,
          ...input
        })
        .returning('*')
        .execute()

    finalUpdoot = UpdootDto.fromUpdootRawEntity(rawUpdoot as DBRawEntities.UpdootRawEntity)
    deltaPoints = input.value
  }

  if (!updoot && input.value === constants.VoteValueTypes.ZERO) {
    return new objects
      .VoteResponse(
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.VOTE_CANT_BE_ZERO].httpCode,
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.VOTE_CANT_BE_ZERO].message,
        responses.payloads.updootsPayloads.error[responses.symbols.UpdootsSymbols.VOTE_CANT_BE_ZERO].code,
        namespace,
        undefined,
        [
          new FieldError(
            'data.value',
            'server.non-zero',
            'Updoot value',
            'Updoot value can not be zero'
          )
        ]
      )
  }

  const { raw: [rawUpdatedPost] } = await tm
    .createQueryBuilder()
    .update(Post)
    .set({ points: () => `points + ${deltaPoints}` })
    .where(
      `${entityConstants.Post.fields.ID} = :id`,
      { id: input.postId }
    )
    .returning('*')
    .execute()

  const log = PostPointsLog.create({
    postId: input.postId,
    delta: deltaPoints
  })

  await log.save()

  const updatedPost = Post.create(rawUpdatedPost as DBRawEntities.PostRawEntity)

  const symbol =
    finalUpdoot
      ? responses.symbols.UpdootsSymbols.POST_VOTED
      : responses.symbols.UpdootsSymbols.VOTE_DELETED

  return new objects
    .VoteResponse(
      responses.payloads.updootsPayloads.success[symbol].httpCode,
      responses.payloads.updootsPayloads.success[symbol].message,
      responses.payloads.updootsPayloads.success[symbol].code,
      namespace,
      new objects.VoteData(
        updatedPost.points,
        finalUpdoot || undefined
      )
    )
}

export default updootTransaction
