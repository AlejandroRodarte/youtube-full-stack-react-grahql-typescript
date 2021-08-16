import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../generator/application-response'
import { AddPostData, EditPostData, GetPostsData, GetPostData, DeletePostData } from './data'

@ObjectType()
export class GetPostsResponse extends ApplicationResponse(GetPostsData) {}

@ObjectType()
export class GetPostResponse extends ApplicationResponse(GetPostData) {}

@ObjectType()
export class AddPostResponse extends ApplicationResponse(AddPostData) {}

@ObjectType()
export class EditPostResponse extends ApplicationResponse(EditPostData) {}

@ObjectType()
export class DeletePostResponse extends ApplicationResponse(DeletePostData) {}
