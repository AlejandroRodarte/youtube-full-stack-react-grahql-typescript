export namespace GraphQLNamespaces {
  export type Namespaces =
    'Posts' |
    'Post' |
    'AddPost' |
    'EditPost' |
    'DeletePost' |
    'Register' |
    'Login' |
    'ForgotPassword' |
    'ChangePassword' |
    'Logout' |
    'Me' |
    'MyStatus' |
    'Vote'

  export type WithNamespace<T> = {
    __typename?: 'Query' | 'Mutation' | 'Subscription'
  } & {
    [K in keyof T]: T[K] & {
      namespace?: string
    }
  }
}
