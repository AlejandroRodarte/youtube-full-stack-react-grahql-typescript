import { NextPage, NextPageContext } from 'next'
import React, { useEffect } from 'react'
import { useMeQuery } from '../generated/graphql'
import { useRouter } from 'next/router'

const withAnonymous = <P extends object>(Component: NextPage<P>) => {
  const Anonymous: NextPage<P> = (props: P) => {
    const router = useRouter()
    const [{ data }] = useMeQuery()

    useEffect(() => {
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
