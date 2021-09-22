import modules from './modules'
import { Store } from '../../types/context'

const reducer: (state: Store.State, action: Store.Actions) => Store.State = (state, action) => {
  let newState = state
  newState = modules.pages.reducer(state, action)
  return newState
}

export default reducer
