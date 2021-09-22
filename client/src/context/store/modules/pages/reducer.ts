import home from './home'
import { PagesModuleHomeStore, Store } from '../../../../types/context'

const reducer: (state: Store.State, action: PagesModuleHomeStore.Actions) => Store.State = (state, action) => {
  let newState = state
  newState = home.reducer(state, action)
  return newState
}

export default reducer
