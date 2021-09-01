import { NextPage, NextPageContext } from 'next'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useMeQuery } from '../generated/graphql'

const withAnonymous = <P extends object>(Component: NextPage<P>) => {
  const Anonymous: NextPage<P> = (props: P) => {
    const router = useRouter()
    const [{ data }] = useMeQuery()

    console.log('Anonymous rerender', data.me.status)
    useEffect(() => {
      console.log('inside Anonymous useEffect', data.me.status)
      if (data.me.status === 200) router.replace('/')
    }, [data.me.status, router])

    return <Component { ...props } />
  }

  if (Component.getInitialProps) {
    Anonymous.getInitialProps = (ctx: NextPageContext) => Component.getInitialProps(ctx)
  }

  return Anonymous
}

export default withAnonymous
