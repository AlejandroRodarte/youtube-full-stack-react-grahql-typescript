import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

import store from './store'
import { Contexts } from '../types/context'

const AppContext = createContext<Contexts.AppContext>({
  store: {
    state: store.state,
    dispatch: (action) => store.reducer(store.state, action)
  }
})

export const AppContextWrapper: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(store.reducer, store.state)

  return (
    <AppContext.Provider value={{ store: { state, dispatch } }}>
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
