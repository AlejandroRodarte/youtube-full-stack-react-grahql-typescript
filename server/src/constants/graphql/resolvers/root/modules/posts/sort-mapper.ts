import * as SortTypes from '../../../../args/posts/sort'

import { GraphQLResolverConstants } from '../../../../../../types/graphql'

const sortMapper: GraphQLResolverConstants.PostsSortMapper = {
  [SortTypes.NEW]: {
    field: 'post."createdAt"',
    cursorParser: (cursor: string) => new Date(+cursor)
  },
  [SortTypes.POPULAR]: {
    field: 'post."points"',
    cursorParser: (cursor: string) => {
      const [createdAtParam, pointsParam] = cursor.split(',')

      const [, createdAt] = createdAtParam.split('=')
      const [, points] = pointsParam.split('=')

      return [new Date(+createdAt), +points]
    }
  },
  [SortTypes.TRENDING]: {
    field: 'post."trendingscore"',
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
