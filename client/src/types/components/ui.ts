export namespace UITypes {
  export type WrapperVariantTypes = 'small' | 'regular'

  interface Route {
    href: string
    name: string
  }
  export interface NavBarRoutes {
    auth: Route[]
    anonymous: Route[]
  }

  export type UpdootVoteTypes = 'upvote' | 'downvote' | 'zero'
  export type UpdootVoteValues = 1 | -1 | 0
}
