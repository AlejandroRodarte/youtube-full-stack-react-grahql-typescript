import React from 'react'

import MainNavBar from '../components/ui/navbar/MainNavBar'
import Wrapper from '../components/ui/wrappers/Wrapper'

import { UITypes } from '../types/components/ui'

interface MainLayoutProps {
  variant: UITypes.WrapperVariantTypes
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, variant }: React.PropsWithChildren<MainLayoutProps>) => {
  return (
    <>
      <MainNavBar />
      <Wrapper variant={ variant }>
        { children }
      </Wrapper>
    </>
  )
}

export default MainLayout
