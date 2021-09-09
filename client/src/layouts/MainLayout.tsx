import React, { useCallback } from 'react'

import MainNavBar from '../components/ui/navbar/MainNavBar'
import Wrapper from '../components/ui/wrappers/Wrapper'

import { UITypes } from '../types/components/ui'
import { MeQuery } from '../generated/graphql'

interface MainLayoutProps {
  variant: UITypes.WrapperVariantTypes
  logout: {
    handler: () => void,
    loading: boolean
  }
  me: MeQuery['me']
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, variant, logout, me }: React.PropsWithChildren<MainLayoutProps>) => {
  const routes: UITypes.NavBarRoutes = {
    auth: [
      {
        href: '/posts/create',
        name: 'Create Post'
      }
    ],
    anonymous: [
      {
        href: '/login',
        name: 'Login'
      },
      {
        href: '/register',
        name: 'Register'
      }
    ]
  }

  const onLogoutHandler = useCallback(() => {
    logout.handler()
  }, [logout])

  return (
    <>
      <MainNavBar
        routes={ routes }
        logout={
          {
            handler: onLogoutHandler,
            loading: logout.loading
          }
        }
        me={ me }
      />
      <Wrapper variant={ variant }>
        { children }
      </Wrapper>
    </>
  )
}

export default MainLayout
