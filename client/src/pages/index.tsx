import React from 'react'
import { withUrqlClient } from 'next-urql'
import MainNavBar from '../components/ui/navbar/MainNavBar'
import nextUrqlClientConfig from '../graphql/urql/client-config'
import { usePostsQuery } from '../generated/graphql'

const Index = () => {
  const [{ data }] = usePostsQuery()

  return (
    <>
      <MainNavBar></MainNavBar>
      <div>hello mamita</div>
      { !data ? null : data.posts.data.posts.map((post) => <div key={ post.id }>{ post.title }</div>) }
    </>
  )
}

export default withUrqlClient(nextUrqlClientConfig, { ssr: true })(Index)
