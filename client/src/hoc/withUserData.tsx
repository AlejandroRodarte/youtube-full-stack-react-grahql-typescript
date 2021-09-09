import React, { useCallback, useState } from 'react'
import { Flex, Button, Heading } from '@chakra-ui/react'

import { useMeQuery, MeQuery } from '../generated/graphql'

export interface UserDataProps {
  me: MeQuery['me']
  wasLoadedOnServer: boolean
}

const withUserData = <P extends UserDataProps>(Component: React.FC<P>) => {
  const UserData: React.FC<P> = (props: P) => {
    const [wasLoadedOnServer, setWasLoadedOnServer] = useState(false)
    const [{ data, fetching, error }, reexecuteMeQuery] = useMeQuery()

    const onTryAgainClick = useCallback(() => {
      reexecuteMeQuery()
    }, [reexecuteMeQuery])

    if (!wasLoadedOnServer && fetching) setWasLoadedOnServer(() => true)

    return (
      <>
        {
          (data && !fetching) && (
            <Component
              { ...props as P }
              me={ data.me }
              wasLoadedOnServer={ wasLoadedOnServer }
            />
          )
        }
        {
          error && (
            <>
              <Heading>
                The server is off
              </Heading>
              <Flex>
                <Button
                  my={ 8 }
                  m="auto"
                  isLoading={ fetching }
                  onClick={ onTryAgainClick }
                >
                  Try again
                </Button>
              </Flex>
            </>
          )
        }
      </>
    )
  }

  return UserData
}

export default withUserData
