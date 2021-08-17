import { ObjectType } from 'type-graphql'

import { RegisterUserData } from './data'
import { FieldError } from '../error/field-error'
import ApplicationResponse from '../../../../generator/graphql/responses/application-response'

@ObjectType()
export class RegisterUserResponse extends ApplicationResponse(RegisterUserData, FieldError) {}
