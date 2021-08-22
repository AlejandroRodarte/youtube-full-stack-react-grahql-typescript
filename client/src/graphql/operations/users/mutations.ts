import gql from 'graphql-tag'

const REGISTER_MUTATION = Symbol('users/registerMutation')

const REGISTER_MUTATION_OPERATION = gql`
  mutation Register($registerData: RegisterUserInput!) {
    register(data: $registerData) {
      status
      message
      code
      data {
        newUser {
          id
          createdAt
          updatedAt
          username
        }
      }
      errors {
        path
        type
        label
        message
      }
    }
  }
`

const MutationSymbols = {
  REGISTER_MUTATION
}

const mutationOperations = {
  [REGISTER_MUTATION]: REGISTER_MUTATION_OPERATION
}

export { MutationSymbols, mutationOperations }
