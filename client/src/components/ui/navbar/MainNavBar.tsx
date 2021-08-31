import { Box, Flex, Link, Button } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import NextLink from 'next/link'

import { useMeQuery, useLogoutMutation } from '../../../generated/graphql'

interface MainNavBarProps {}

const MainNavBar: React.FC<MainNavBarProps> = () => {
  const [{ data, fetching: meFetching }] = useMeQuery()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()

  const onLogoutButtonClick = useCallback(() => {
    logout()
  }, [logout])

  let linksJsx = (
    <>
      <NextLink href="/login">
        <Link
          mr={ 2 }
          color="white"
        >
          Login
        </Link>
      </NextLink>
      <NextLink href="/register">
        <Link
          mr={ 2 }
          color="white"
        >
          Register
        </Link>
      </NextLink>
    </>
  )

  if (meFetching) {
    linksJsx = null
  }

  if (data?.me?.data?.user) {
    linksJsx = (
      <Flex>
        <Box mr={ 2 }>
          { data.me.data.user.username }
        </Box>
        <Button
          variant="link"
          onClick={ onLogoutButtonClick }
          isLoading={ logoutFetching }
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
