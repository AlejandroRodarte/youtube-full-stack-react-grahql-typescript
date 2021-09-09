import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import withUserData, { UserDataProps } from './withUserData'

export interface AnonymousProps extends UserDataProps {
  wasLoadedOnServer: boolean
}

const withAnonymous = <P extends AnonymousProps>(Component: React.FC<P>) => {
  const Anonymous: React.FC<P> = (props: P) => {
    const router = useRouter()
    const { redirectTo = '/' } = router.query

    useEffect(() => {
      if (props.wasLoadedOnServer && props.me.status === 200) {
        router.replace(redirectTo as string)
      }
    }, [props.me.status, redirectTo, router, props.wasLoadedOnServer])

    return (
      (props.me.status === 401) && <Component { ...props as P }/>
    )
  }

  return withUserData(Anonymous)
}

export default withAnonymous
