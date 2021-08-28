import { NextPage, NextPageContext } from 'next'
import React, { useEffect } from 'react'
import { useMeQuery } from '../generated/graphql'
import { useRouter } from 'next/router'

const withAuth = <P extends object>(Component: NextPage<P>) => {
  const Auth: NextPage<P> = (props: P) => {
    const router = useRouter()
    const [{ data }] = useMeQuery()

    useEffect(() => {
      if (data.me.status === 401) router.replace('/login')
    }, [data.me.status, router])

    if (Component.getInitialProps) {
      Auth.getInitialProps = (ctx: NextPageContext) => Component.getInitialProps(ctx)
    }

    return <Component { ...props } />
  }

  return Auth
}

export default withAuth
