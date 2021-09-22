import { ObjectType, Field, Int, ClassType } from 'type-graphql'

export default function ApplicationResponse<T, U> (
  TClass: ClassType<T>,
  UClass: ClassType<U>
) {
  @ObjectType({ isAbstract: true })
  abstract class ApplicationResponseClass {
    @Field(() => String)
    timestamp: string

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
    namespace?: string

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
      namespace?: string,
      data?: T,
      errors?: U[]
    ) {
      this.timestamp = new Date().getTime().toString()
      this.status = status
      this.message = message
      this.code = code
      this.namespace = namespace
      this.data = data
      this.errors = errors
    }
  }

  return ApplicationResponseClass
}
