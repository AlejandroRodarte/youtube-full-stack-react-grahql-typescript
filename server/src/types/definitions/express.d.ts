import 'express'

declare module 'express' {
  export interface Request {
    body: {
      operationName: string | undefined
    }
  }
}
