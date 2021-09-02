import React from 'react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'

import { usePostsQuery } from '../generated/graphql'

import MainLayout from '../layouts/MainLayout'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
  const [{ data }] = usePostsQuery()

  return (
    <>
      <MainLayout variant="small">
        <div>hello mamita</div>
        { data && data.posts.data.posts.map((post) => <div key={ post.id }>{ post.title }</div>) }
      </MainLayout>
    </>
  )
}

export default withUrqlClient(nextUrqlClientConfig, { ssr: true })(Index)
