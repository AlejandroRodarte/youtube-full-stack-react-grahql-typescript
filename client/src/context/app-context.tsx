import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

import { Contexts, State, StateCommonTypes } from '../types/context'

const initialState: State.AppState = {
  pages: {
    home: {
      posts: {
        new: [],
        popular: [],
        trending: []
      },
      sort: 'trending',
      cursors: {
        new: '',
        popular: '',
        trending: ''
      },
      exclude: {
        popular: [],
        trending: []
      },
      pristine: {
        popular: [],
        trending: []
      }
    }
  }
}

const reducer: (state: State.AppState, action: State.AppActions) => State.AppState = (state: State.AppState, action: State.AppActions) => {
  switch (action.type) {
    case 'home/reset': {
      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            posts: {
              ...state.pages.home.posts,
              new: [],
              popular: [],
              trending: []
            },
            cursors: {
              ...state.pages.home.cursors,
              new: '',
              popular: '',
              trending: ''
            },
            exclude: {
              ...state.pages.home.exclude,
              popular: [],
              trending: []
            },
            pristine: {
              ...state.pages.home.pristine,
              popular: [],
              trending: []
            }
          }
        }
      }
    }
    case 'home/setCursor': {
      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            cursors: {
              ...state.pages.home.cursors,
              [state.pages.home.sort]: action.payload.cursor
            }
          }
        }
      }
    }
    case 'home/updateExcludedPostsFromUpdatedPost': {
      const update = (posts: StateCommonTypes.ExcludedPost[]): StateCommonTypes.ExcludedPost[] => {
        const currentPoints = action.payload.post.points
        const pristinePoints = state.pages.home.pristine[state.pages.home.sort].find((post) => post.id === action.payload.post.id).points

        if (currentPoints < pristinePoints) {
          const index = posts.findIndex((post) => post.id === action.payload.post.id)

          if (index === -1) return [...posts, action.payload.post]
          else {
            return posts.map((post) => {
              if (post.id === action.payload.post.id) return { ...post, points: action.payload.post.points }
              return post
            })
          }
        } else return posts.filter((post) => post.id !== action.payload.post.id)
      }

      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            exclude: {
              ...state.pages.home.exclude,
              [state.pages.home.sort]: update(state.pages.home.exclude[state.pages.home.sort])
            }
          }
        }
      }
    }
    case 'home/setSort': {
      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            sort: action.payload.sort
          }
        }
      }
    }
    case 'home/setPosts': {
      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            posts: {
              ...state.pages.home.posts,
              [state.pages.home.sort]: action.payload.posts
            }
          }
        }
      }
    }
    case 'home/addPristinePosts': {
      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            pristine: {
              ...state.pages.home.pristine,
              [state.pages.home.sort]: [
                ...state.pages.home.pristine[state.pages.home.sort],
                ...action.payload.posts.map((post) => ({
                  id: post.id,
                  points: post.points
                }))
              ]
            }
          }
        }
      }
    }
    case 'home/updateExcludedPostsFromLastFetchedPost': {
      const update = (posts: StateCommonTypes.ExcludedPost[]): StateCommonTypes.ExcludedPost[] => {
        return posts.filter((post) => {
          if (
            (action.payload.post.points < post.points) ||
            (action.payload.post.points <= post.points && +action.payload.post.createdAt < +post.createdAt)
          ) return false
          return true
        })
      }

      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            exclude: {
              ...state.pages.home.exclude,
              [state.pages.home.sort]: update(state.pages.home.exclude[state.pages.home.sort])
            }
          }
        }
      }
    }
    default:
      return state
  }
}

const AppContext = createContext<Contexts.AppContext>({
  store: {
    state: initialState,
    dispatch: (action) => reducer(initialState, action)
  }
})

export const AppContextWrapper: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const store = { state, dispatch }

  return (
    <AppContext.Provider value={ { store } }>
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
