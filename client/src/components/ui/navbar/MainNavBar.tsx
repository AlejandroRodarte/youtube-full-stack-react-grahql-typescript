import { Box, Flex, Link, Button } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import NextLink from 'next/link'

import { UITypes } from '../../../types/components/ui'
import { MeQuery } from '../../../generated/graphql'

interface MainNavBarProps {
  routes: UITypes.NavBarRoutes
  logout: {
    handler: () => void
    loading: boolean
  },
  me: MeQuery['me']
}

const MainNavBar: React.FC<MainNavBarProps> = ({ routes, logout, me }: MainNavBarProps) => {
  const onLogoutButtonClick = useCallback(() => {
    logout.handler()
  }, [logout])

  let linksJsx = (
    <>
      {
        routes.anonymous.map((route) => (
          <NextLink
            key={ route.href }
            href={ route.href }
          >
            <Link
              mr={ 2 }
              color="white"
            >
              { route.name }
            </Link>
          </NextLink>
        ))
      }
    </>
  )

  if (me.data) {
    linksJsx = (
      <Flex>
        <Box mr={ 2 }>
          { me.data.user.username }
        </Box>
        {
          routes.auth.map((route) => (
            <NextLink
              key={ route.href }
              href={ route.href }
            >
              <Link
                mr={ 2 }
                color="white"
              >
                { route.name }
              </Link>
            </NextLink>
          ))
        }
        <Button
          variant="link"
          onClick={ onLogoutButtonClick }
          isLoading={ logout.loading }
        >
          logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex
      bg="tomato"
      p={ 4 }
      position="sticky"
      top={ 0 }
      zIndex={ 1 }
    >
      <Box ml="auto">
        { linksJsx }
      </Box>
    </Flex>
  )
}

export default MainNavBar
