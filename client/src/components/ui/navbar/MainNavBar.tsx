import { Box, Flex, Link, Button } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useMeQuery } from '../../../generated/graphql'

interface MainNavBarProps {}

const MainNavBar: React.FC<MainNavBarProps> = () => {
  const [{ data, fetching }] = useMeQuery()

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

  if (fetching) {
    linksJsx = null
  }

  if (data?.me?.data?.user) {
    linksJsx = (
      <Flex>
        <Box mr={ 2 }>
          { data.me.data.user.username }
        </Box>
        <Button variant="link">
          logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex
      bg="tomato"
      p={ 4 }
    >
      <Box ml="auto">
        { linksJsx }
      </Box>
    </Flex>
  )
}

export default MainNavBar
