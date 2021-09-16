import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { Contexts } from '../types/context'

const AppContext = createContext<Contexts.AppContext>({
  pages: {
    home: {
      posts: {
        new: {
          value: [],
          set: () => {}
        },
        popular: {
          value: [],
          set: () => {}
        }
      },
      sort: {
        value: 'new',
        set: () => {}
      },
      cursors: {
        new: {
          value: null,
          set: () => {}
        },
        popular: {
          value: null,
          set: () => {}
        }
      }
    }
  }
})

export const AppContextWrapper: React.FC = ({ children }) => {
  const [sort, setSort] = useState<Contexts.Sort>('new')

  const [newPosts, setNewPosts] = useState<Contexts.Posts>([])
  const [popularPosts, setPopularPosts] = useState<Contexts.Posts>([])

  const [newCursor, setNewCursor] = useState<string | null>(null)
  const [popularCursor, setPopularCursor] = useState<string | null>(null)

  const initialContext: Contexts.AppContext = {
    pages: {
      home: {
        posts: {
          new: {
            value: newPosts,
            set: setNewPosts
          },
          popular: {
            value: popularPosts,
            set: setPopularPosts
          }
        },
        sort: {
          value: sort,
          set: setSort
        },
        cursors: {
          new: {
            value: newCursor,
            set: setNewCursor
          },
          popular: {
            value: popularCursor,
            set: setPopularCursor
          }
        }
      }
    }
  }

  return (
    <AppContext.Provider value={ initialContext }>
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
