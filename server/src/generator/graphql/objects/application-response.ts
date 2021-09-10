import { ObjectType, Field, Int, ClassType } from 'type-graphql'

export default function ApplicationResponse<T, U> (
  TClass: ClassType<T>,
  UClass: ClassType<U>
) {
  @ObjectType({ isAbstract: true })
  abstract class ApplicationResponseClass {
    @Field(() => Int)
    status: number

    @Field(() => String)
    message: string

    @Field(() => String)
    code: string

    @Field(
      () => String,
      { nullable: true }
    )
    _kind?: string

    @Field(
      () => TClass,
      { nullable: true }
    )
    data?: T

    @Field(
      () => [UClass],
      { nullable: true }
    )
    errors?: U[]

    constructor (
      status: number,
      message: string,
      code: string,
      kind?: string,
      data?: T,
      errors?: U[]
    ) {
      this.status = status
      this.message = message
      this.code = code
      this._kind = kind
      this.data = data
      this.errors = errors
    }
  }

  return ApplicationResponseClass
}
