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
  timestamps: {
    current: {
      new: '',
      popular: '',
      trending: ''
    },
    previous: {
      new: '',
      popular: '',
      trending: ''
    }
  },
  pristine: {
    popular: [],
    trending: []
  },
  ids: {
    current: {
      new: [],
      popular: [],
      trending: []
    },
    previous: {
      new: [],
      popular: [],
      trending: []
    }
  }
}

export default state
