import { PagesModuleHomeStore } from '../../../../../types/context'

const state: PagesModuleHomeStore.State = {
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

export default state
