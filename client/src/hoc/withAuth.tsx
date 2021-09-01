import { NextPage, NextPageContext } from 'next'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useMeQuery } from '../generated/graphql'

const withAuth = <P extends object>(Component: NextPage<P>) => {
  const Auth: NextPage<P> = (props: P) => {
    const router = useRouter()
    const [{ data }] = useMeQuery()

    console.log('Auth rerender', data.me.status)
    useEffect(() => {
      console.log('inside Auth useEffect', data.me.status)
      if (data.me.status === 401) router.replace('/')
    }, [data.me.status, router])

    return <Component { ...props } />
  }

  if (Component.getInitialProps) {
    Auth.getInitialProps = (ctx: NextPageContext) => Component.getInitialProps(ctx)
  }

  return Auth
}

export default withAuth
