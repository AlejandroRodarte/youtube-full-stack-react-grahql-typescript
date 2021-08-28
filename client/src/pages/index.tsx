import React from 'react'
import MainNavBar from '../components/ui/navbar/MainNavBar'
import { usePostsQuery } from '../generated/graphql'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
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
