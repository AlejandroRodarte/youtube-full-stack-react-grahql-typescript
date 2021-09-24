import * as SortTypes from '../../../../args/posts/sort'
import postEntityConstants from '../../../../../db/orm/entities/Post'
import derivedTableConstants from '../../../../../util/db/derived-tables'

import { GraphQLResolverConstants } from '../../../../../../types/graphql'

const sortMapper: GraphQLResolverConstants.PostsSortMapper = {
  [SortTypes.NEW]: {
    field: `${derivedTableConstants.postsWithTrendingScore.aliases.main}."${postEntityConstants.fields.CREATED_AT}"`,
    cursorParser: (cursor: string) => new Date(+cursor)
  },
  [SortTypes.POPULAR]: {
    field: `${derivedTableConstants.postsWithTrendingScore.aliases.main}."${postEntityConstants.fields.POINTS}"`,
    cursorParser: (cursor: string) => {
      const [createdAtParam, pointsParam] = cursor.split(',')

      const [, createdAt] = createdAtParam.split('=')
      const [, points] = pointsParam.split('=')

      return [new Date(+createdAt), +points]
    }
  },
  [SortTypes.TRENDING]: {
    field: `${derivedTableConstants.postsWithTrendingScore.aliases.main}."${derivedTableConstants.postsWithTrendingScore.additionalSelects.aliases.TRENDING_SCORE}"`,
    cursorParser: (cursor: string) => {
      const [createdAtParam, pointsParam, trendingScoreParam] = cursor.split(',')

      const [, createdAt] = createdAtParam.split('=')
      const [, points] = pointsParam.split('=')
      const [, trendingScore] = trendingScoreParam.split('=')

      return [new Date(+createdAt), +points, +trendingScore]
    }
  }
}

export default sortMapper
