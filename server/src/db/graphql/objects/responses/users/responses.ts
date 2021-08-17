import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../generator/application-response'
import { RegisterUserData } from './data'
import { FieldError } from '../error/field-error'

@ObjectType()
export class RegisterUserResponse extends ApplicationResponse(RegisterUserData, FieldError) {}
