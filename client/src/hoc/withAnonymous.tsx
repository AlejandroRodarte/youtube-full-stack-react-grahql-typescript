import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useMeQuery } from '../generated/graphql'

const withAnonymous = <P extends object>(Component: React.FC<P>) => {
  const Anonymous: React.FC<P> = (props: P) => {
    const router = useRouter()
    const [{ data, fetching }] = useMeQuery()

    const status = data ? data.me.status : -1

    useEffect(() => {
      if (!fetching && status === 200) router.replace('/')
    }, [fetching, router, status])

    return ((!fetching && status === 401) && <Component { ...props } />)
  }

  return Anonymous
}

export default withAnonymous
