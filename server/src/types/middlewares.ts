export namespace MiddlewareTypes {
  interface AuthenticationMiddlewareGeneratorOptions {
    isApplicationResponse: boolean
  }

  export interface AnonymousMiddlewareGeneratorOptions extends AuthenticationMiddlewareGeneratorOptions {}

  export interface AuthMiddlewareGeneratorOptions extends AuthenticationMiddlewareGeneratorOptions {
    checkUserOnDatabase: boolean
  }
}
