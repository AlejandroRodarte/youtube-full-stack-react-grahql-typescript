import { InputType } from 'type-graphql'
import { RegisterUserInput } from './register-user-input'

@InputType()
export class LoginUserInput extends RegisterUserInput {}
