import * as SortTypes from '../../../constants/args/posts/sort'

import { GraphQLResolverConstants } from 'src/types/graphql'

const sortMapper: GraphQLResolverConstants.PostsSortMapper = {
  [SortTypes.NEW]: {
    field: 'createdAt',
    cursorParser: (cursor: string) => new Date(+cursor)
  },
  [SortTypes.POPULAR]: {
    field: 'points',
    cursorParser: (cursor: string) => +cursor
  }
}

export default sortMapper
