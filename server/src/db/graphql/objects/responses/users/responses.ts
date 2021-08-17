import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../generator/application-response'
import { RegisterUserData } from './data'

@ObjectType()
export class RegisterUserResponse extends ApplicationResponse(RegisterUserData) {}
