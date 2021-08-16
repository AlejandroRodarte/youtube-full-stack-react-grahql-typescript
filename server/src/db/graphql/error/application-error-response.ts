import { ApolloError } from 'apollo-server-errors'

export default class ApplicationErrorResponse extends ApolloError {
  httpCode: number

  constructor (httpCode: number, message: string, textCode: string) {
    super(message, textCode)
    this.httpCode = httpCode
    Object.defineProperty(this, 'name', { value: 'ApplicationErrorResponse' })
  }
}
