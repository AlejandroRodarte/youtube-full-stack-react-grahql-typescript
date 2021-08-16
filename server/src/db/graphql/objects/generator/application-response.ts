import { ObjectType, Field, Int, ClassType } from 'type-graphql'

export default function ApplicationResponse<T> (TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class ApplicationResponseClass {
    @Field(() => Int)
    status!: number

    @Field(() => String)
    message!: string

    @Field(() => TClass)
    data!: T

    constructor (status: number, message: string, data: T) {
      this.status = status
      this.message = message
      this.data = data
    }
  }
  return ApplicationResponseClass
}
