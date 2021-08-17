import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../generator/graphql/responses/application-response'
import { AddPostData, EditPostData, GetPostsData, GetPostData, DeletePostData } from './data'
import { FieldError } from '../error/field-error'

@ObjectType()
export class GetPostsResponse extends ApplicationResponse(GetPostsData, String) {}

@ObjectType()
export class GetPostResponse extends ApplicationResponse(GetPostData, String) {}

@ObjectType()
export class AddPostResponse extends ApplicationResponse(AddPostData, FieldError) {}

@ObjectType()
export class EditPostResponse extends ApplicationResponse(EditPostData, FieldError) {}

@ObjectType()
export class DeletePostResponse extends ApplicationResponse(DeletePostData, String) {}
