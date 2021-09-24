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
  pristine: {
    popular: [],
    trending: []
  },
  excludeIds: {
    current: {
      popular: [],
      trending: []
    },
    previous: {
      popular: [],
      trending: []
    }
  }
}

export default state
