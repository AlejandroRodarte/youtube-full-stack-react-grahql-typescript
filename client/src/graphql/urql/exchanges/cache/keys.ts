import { KeyingConfig } from '@urql/exchange-graphcache'

const keys: KeyingConfig = {
  MeResponse: () => null,
  MeData: () => null,
  PostsResponse: () => null,
  PostsData: () => null,
  FieldError: () => null
}

export default keys
