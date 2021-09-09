import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import withUserData, { UserDataProps } from './withUserData'

export interface AuthProps extends UserDataProps {}

const withAuth = <P extends AuthProps>(Component: React.FC<P>, redirectTo = '/login') => {
  const Auth: React.FC<P> = (props: P) => {
    const router = useRouter()

    useEffect(() => {
      if (props.me.status === 401) {
        router.replace({
          pathname: redirectTo,
          query: {
            redirectTo: router.pathname
          }
        })
      }
    }, [props.me.status, router])

    return ((props.me.status === 200) && <Component { ...props as P } />)
  }

  return withUserData(Auth)
}

export default withAuth
