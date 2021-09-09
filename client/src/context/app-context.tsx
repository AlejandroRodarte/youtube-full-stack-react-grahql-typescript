import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { Contexts } from '../types/context'

const AppContext = createContext<Contexts.AppContext>({
  posts: [],
  setPosts: () => {}
})

export const AppContextWrapper: React.FC = ({ children }) => {
  const [posts, setPosts] = useState<Contexts.Posts>([])

  return (
    <AppContext.Provider value={{ posts, setPosts }}>
      { children }
    </AppContext.Provider>
  )
}

AppContextWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export function useAppContext () {
  return useContext(AppContext)
}
