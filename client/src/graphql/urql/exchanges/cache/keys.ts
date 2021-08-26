import { KeyingConfig } from '@urql/exchange-graphcache'

const keys: KeyingConfig = {
  MeUserResponse: () => null,
  MeUserData: () => null,
  GetPostsResponse: () => null,
  GetPostsData: () => null
}

export default keys
