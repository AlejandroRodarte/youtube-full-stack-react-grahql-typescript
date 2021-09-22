import * as types from './types'
import { Store, PagesModuleHomeStore, StoreSharedTypes } from '../../../../../types/context'

const reducer: (state: Store.State, action: PagesModuleHomeStore.Actions) => Store.State = (state, action) => {
  switch (action.type) {
    case types.RESET: {
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
    case types.SET_CURSOR: {
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
    case types.UPDATE_EXCLUDED_POSTS_FROM_UPDATED_POST: {
      const update = (posts: StoreSharedTypes.ExcludedPost[]): StoreSharedTypes.ExcludedPost[] => {
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
    case types.SET_SORT: {
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
    case types.SET_POSTS: {
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
    case types.ADD_PRISTINE_POSTS: {
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
    case types.UPDATE_EXCLUDED_POSTS_FROM_LAST_FETCHED_POST: {
      const update = (posts: StoreSharedTypes.ExcludedPost[]): StoreSharedTypes.ExcludedPost[] => {
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

export default reducer
