import modules from './modules'
import { Store } from '../../types/context'

const state: Store.State = {
  pages: modules.pages.state
}

export default state
