import * as types from './types'
import { Store, PagesModuleHomeStore } from '../../../../../types/context'

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
            timestamps: {
              ...state.pages.home.timestamps,
              current: {
                ...state.pages.home.timestamps.current,
                new: '',
                popular: '',
                trending: ''
              },
              previous: {
                ...state.pages.home.timestamps.previous,
                new: '',
                popular: '',
                trending: ''
              }
            },
            pristine: {
              ...state.pages.home.pristine,
              popular: [],
              trending: []
            },
            ids: {
              ...state.pages.home.ids,
              current: {
                ...state.pages.home.ids.current,
                new: [],
                popular: [],
                trending: []
              },
              previous: {
                ...state.pages.home.ids.previous,
                new: [],
                popular: [],
                trending: []
              }
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
    case types.SET_TIMESTAMP: {
      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            timestamps: {
              ...state.pages.home.timestamps,
              current: {
                ...state.pages.home.timestamps.current,
                [state.pages.home.sort]: action.payload.timestamp
              }
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
    case types.ADD_IDS: {
      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            ids: {
              ...state.pages.home.ids,
              current: {
                ...state.pages.home.ids.current,
                [state.pages.home.sort]: [
                  ...state.pages.home.ids.current[state.pages.home.sort],
                  ...action.payload.ids
                ]
              }
            }
          }
        }
      }
    }
    case types.SET_PREVIOUS_ARGS: {
      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            timestamps: {
              ...state.pages.home.timestamps,
              previous: {
                ...state.pages.home.timestamps.previous,
                [state.pages.home.sort]: state.pages.home.timestamps.current[state.pages.home.sort]
              }
            },
            ids: {
              ...state.pages.home.ids,
              previous: {
                ...state.pages.home.ids.previous,
                [state.pages.home.sort]: [...state.pages.home.ids.current[state.pages.home.sort]]
              }
            }
          }
        }
      }
    }
    case types.REGISTER_NEW_POST: {
      if (!state.pages.home.timestamps.current.new) return state
      return {
        ...state,
        pages: {
          ...state.pages,
          home: {
            ...state.pages.home,
            ids: {
              ...state.pages.home.ids,
              current: {
                ...state.pages.home.ids.current,
                new: [...state.pages.home.ids.current.new, action.payload.id]
              }
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
