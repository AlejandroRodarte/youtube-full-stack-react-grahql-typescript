import { LoginMutation, RegisterMutation, LogoutMutation, ChangePasswordMutation } from '../../../generated/graphql'

export namespace GraphQLUsersOperations {
  export type LoginOperationResponse = LoginMutation
  export type RegisterOperationResponse = RegisterMutation
  export type LogoutOperationResponse = LogoutMutation
  export type ChangePasswordOperationResponse = ChangePasswordMutation
}
