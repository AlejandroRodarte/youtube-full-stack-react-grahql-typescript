import 'typeorm/error/QueryFailedError'

declare module 'typeorm/error/QueryFailedError' {
  export interface QueryFailedError {
    constraint?: string
  }
}
