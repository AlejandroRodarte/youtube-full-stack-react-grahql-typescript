import { AddPostData, EditPostData, GetPostData, GetPostsData, DeletePostData } from './data'
import { AddPostResponse, EditPostResponse, GetPostsResponse, GetPostResponse, DeletePostResponse } from './responses'

const responses = {
  GetPostsResponse,
  GetPostResponse,
  AddPostResponse,
  EditPostResponse,
  DeletePostResponse
}

const data = {
  GetPostsData,
  GetPostData,
  AddPostData,
  EditPostData,
  DeletePostData
}

const classes = {
  responses,
  data
}

export default classes
