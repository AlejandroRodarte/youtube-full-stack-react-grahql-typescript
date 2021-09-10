import * as SortTypes from '../../../../args/posts/sort'

import { GraphQLResolverConstants } from '../../../../../../types/graphql'

const sortMapper: GraphQLResolverConstants.PostsSortMapper = {
  [SortTypes.NEW]: {
    field: 'createdAt',
    cursorParser: (cursor: string) => new Date(+cursor)
  },
  [SortTypes.POPULAR]: {
    field: 'points',
    cursorParser: (cursor: string) => {
      const [createdAtParam, pointsParam] = cursor.split(',')

      const [, createdAt] = createdAtParam.split('=')
      const [, points] = pointsParam.split('=')

      return [new Date(+createdAt), +points]
    }
  }
}

export default sortMapper
