import { Box } from '@chakra-ui/react'
import React from 'react'

interface WrapperProps {
  children: React.ReactNode
  variant?: 'small' | 'regular'
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular'
}: WrapperProps) => {
  const maxW = variant === 'regular' ? '800px' : '400px'

  return (
    <Box
      maxW={ maxW }
      w="100%"
      mt={ 8 }
      mx="auto"
    >
      { children }
    </Box>
  )
}

export default Wrapper
