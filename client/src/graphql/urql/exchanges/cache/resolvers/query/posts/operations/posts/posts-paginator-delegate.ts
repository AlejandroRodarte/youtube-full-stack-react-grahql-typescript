import { ResolveInfo, Cache } from '@urql/exchange-graphcache'

import { PostsQuery, QueryPostsArgs } from '../../../../../../../../../generated/graphql'

import { GraphQLUrqlCache } from '../../../../../../../../../types/graphql/urql/cache'

const postsPaginatorDelegate: GraphQLUrqlCache.PostsPaginatorDelegateFunction<PostsQuery, QueryPostsArgs> =
  (
    result: PostsQuery,
    args: QueryPostsArgs,
    cache: Cache,
    info: ResolveInfo
  ) => {
    // entityKey: 'Query', fieldName: 'posts'
    const { parentKey: entityKey, fieldName } = info

    // get records of all queries we have made so far
    const allFields = cache.inspectFields(entityKey)

    // from all query records, filter only those related to the 'posts' resolver
    // and that match the sorting type ('new' or 'popular')
    const fieldInfos = allFields.filter(
      (info) =>
        info.fieldName === fieldName &&
        args.data.sort === (info.arguments as QueryPostsArgs).data.sort
    )

    // if no records exist yet, restart
    const size = fieldInfos.length
    if (size === 0) return undefined

    const results: string[] = []

    // loop through each query record
    fieldInfos.forEach((fieldInfo) => {
      // resolve for Query.posts(data: PostsInput!).data.posts
      // posts = ["Post:1", "Post:2", "Post:3", ...]
      // where __typename: "Post" and id: <id>; this is how graphcache locates cached data
      const key = cache.resolve(entityKey, fieldInfo.fieldKey) as string
      const data = cache.resolve(key, 'data') as string
      const posts = cache.resolve(data, 'posts')

      // get the operation name for this query cache
      const _kind = cache.resolve(key, '_kind') as string

      // if there is posts in this specific query cache, push to array
      // if there are no posts, invalidate this query cache so we can try to make the request again
      if (_kind === 'Posts') {
        if (posts) results.push(...(posts as string[]))
        else cache.invalidate(entityKey, fieldInfo.fieldKey)
      }
    })

    // if parent is an empty object...(only occurs when loading the page for the first time)
    // return a barebones version of the 'PostsResponse' object
    if (!result.posts.__typename) {
      return {
        __typename: 'PostsResponse',
        data: {
          __typename: 'PostsData',
          posts: results
        }
      }
    }

    // if parent is present...(occurs on all subsequent requests)
    // return the same parent structure, but with all the bundled posts from past queries
    return {
      ...result.posts,
      data: {
        ...result.posts.data,
        posts: results
      }
    }
  }

export default postsPaginatorDelegate
