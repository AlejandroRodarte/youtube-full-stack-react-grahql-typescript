import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useMeQuery } from '../generated/graphql'

const withAuth = <P extends object>(Component: React.FC<P>) => {
  const Auth: React.FC<P> = (props: P) => {
    const router = useRouter()
    const [{ data, fetching }] = useMeQuery()

    const status = data ? data.me.status : -1

    useEffect(() => {
      if (!fetching && status === 401) router.replace('/')
    }, [status, router, fetching])

    return ((!fetching && status === 200) && <Component { ...props } />)
  }

  return Auth
}

export default withAuth
