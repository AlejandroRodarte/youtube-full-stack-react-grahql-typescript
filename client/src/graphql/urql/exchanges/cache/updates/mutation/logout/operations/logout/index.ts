import { Cache } from '@urql/exchange-graphcache'

import delegates from './delegates'
import { QueryPostsArgs, PostsQuery, PostsQueryVariables, PostsDocument, MeQuery, MeDocument } from '../../../../../../../../../generated/graphql'

const handleLogoutOperation = (cache: Cache) => {
  const queriesInfo = cache.inspectFields('Query')

  const fieldInfos = queriesInfo.filter(
    (fieldInfo) =>
      fieldInfo.fieldName === 'posts' &&
      (fieldInfo.arguments as QueryPostsArgs).namespace === 'Posts'
  )

  fieldInfos.forEach((fieldInfo) => {
    cache.updateQuery<PostsQuery, PostsQueryVariables>(
      { query: PostsDocument, variables: { postsData: (fieldInfo.arguments as QueryPostsArgs).data } },
      (data) => delegates.postsQueryUpdaterDelegate(data)
    )
  })

  return cache
    .updateQuery<MeQuery>(
      { query: MeDocument },
      (data) => delegates.meQueryUpdaterDelegate(data)
    )
}

export default handleLogoutOperation
