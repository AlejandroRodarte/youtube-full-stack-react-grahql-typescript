import Auth from './auth'
import Anonymous from './anonymous'
import CanMutatePost from './can-mutate-post'

const middleware = {
  Auth,
  Anonymous,
  CanMutatePost
}

export default middleware
