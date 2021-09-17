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
      },
      excludeIds: {
        popular: {
          value: null,
          set: () => {}
        }
      },
      pristine: {
        popular: {
          points: {
            value: [],
            set: () => {}
          }
        }
      }
    }
  }
})

export const AppContextWrapper: React.FC = ({ children }) => {
  const [sort, setSort] = useState<Contexts.Sort>('popular')

  const [newPosts, setNewPosts] = useState<Contexts.Posts>([])
  const [popularPosts, setPopularPosts] = useState<Contexts.Posts>([])

  const [newCursor, setNewCursor] = useState<string | null>(null)
  const [popularCursor, setPopularCursor] = useState<string | null>(null)

  const [pristinePopularPoints, setPristinePopularPoints] = useState<Contexts.PostPointsCondensedObject[]>([])

  const [popularExcludeIds, setPopularExcludeIds] = useState<number[] | null>(null)

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
        },
        excludeIds: {
          popular: {
            value: popularExcludeIds,
            set: setPopularExcludeIds
          }
        },
        pristine: {
          popular: {
            points: {
              value: pristinePopularPoints,
              set: setPristinePopularPoints
            }
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
