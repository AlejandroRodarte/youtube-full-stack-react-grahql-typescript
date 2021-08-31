import { Box } from '@chakra-ui/react'
import React from 'react'

import { UITypes } from '../../../types/components/ui'

interface WrapperProps {
  children: React.ReactNode
  variant?: UITypes.WrapperVariantTypes
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
