import '@mikro-orm/core/exceptions'

declare module '@mikro-orm/core/exceptions' {
  export interface UniqueConstraintViolationException {
    constraint: string
  }
}
