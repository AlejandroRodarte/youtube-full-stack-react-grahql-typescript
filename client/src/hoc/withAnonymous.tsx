import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useMeQuery } from '../generated/graphql'

export interface AnonymousProps {
  wasLoadedOnServer: boolean
}

const withAnonymous = <P extends AnonymousProps>(Component: React.FC<P>) => {
  const Anonymous: React.FC<P> = (props: P) => {
    const router = useRouter()
    const { redirectTo = '/' } = router.query

    const [wasLoadedOnServer, setWasLoadedOnServer] = useState(false)
    const [{ data, fetching }] = useMeQuery()
    const status = data ? data.me.status : -1

    if (!wasLoadedOnServer && status === -1) setWasLoadedOnServer(() => true)

    useEffect(() => {
      if (wasLoadedOnServer && !fetching && status === 200) router.replace(redirectTo as string)
    }, [fetching, redirectTo, router, status, wasLoadedOnServer])

    return (
      (!fetching && status === 401) &&
      <Component
        { ...props as P }
        wasLoadedOnServer={ wasLoadedOnServer }
      />
    )
  }

  return Anonymous
}

export default withAnonymous
