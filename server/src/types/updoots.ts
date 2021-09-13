import constants from '../constants/graphql/args/updoots'

export namespace UpdootTypes {
  export type UpdootValues =
    typeof constants.VoteValueTypes.UPVOTE |
    typeof constants.VoteValueTypes.DOWNVOTE |
    typeof constants.VoteValueTypes.ZERO
}
