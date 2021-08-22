import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddPostData = {
  __typename?: 'AddPostData';
  newPost: Post;
};

export type AddPostInput = {
  title: Scalars['String'];
};

export type AddPostResponse = {
  __typename?: 'AddPostResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  data?: Maybe<AddPostData>;
  errors?: Maybe<Array<FieldError>>;
};

export type DeletePostData = {
  __typename?: 'DeletePostData';
  id: Scalars['Int'];
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  data?: Maybe<DeletePostData>;
  errors?: Maybe<Array<FieldError>>;
};

export type EditPostData = {
  __typename?: 'EditPostData';
  updatedPost: Post;
};

export type EditPostInput = {
  title?: Maybe<Scalars['String']>;
};

export type EditPostResponse = {
  __typename?: 'EditPostResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  data?: Maybe<EditPostData>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  type: Scalars['String'];
  label: Scalars['String'];
  message: Scalars['String'];
};

export type GetPostData = {
  __typename?: 'GetPostData';
  post: Post;
};

export type GetPostResponse = {
  __typename?: 'GetPostResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  data?: Maybe<GetPostData>;
  errors?: Maybe<Array<FieldError>>;
};

export type GetPostsData = {
  __typename?: 'GetPostsData';
  posts: Array<Post>;
};

export type GetPostsResponse = {
  __typename?: 'GetPostsResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  data?: Maybe<GetPostsData>;
  errors?: Maybe<Array<FieldError>>;
};

export type LoginUserData = {
  __typename?: 'LoginUserData';
  user: User;
};

export type LoginUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  data?: Maybe<LoginUserData>;
  errors?: Maybe<Array<FieldError>>;
};

export type MeUserData = {
  __typename?: 'MeUserData';
  user: User;
};

export type MeUserResponse = {
  __typename?: 'MeUserResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  data?: Maybe<MeUserData>;
  errors?: Maybe<Array<FieldError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: AddPostResponse;
  editPost: EditPostResponse;
  deletePost: DeletePostResponse;
  register: RegisterUserResponse;
  login: LoginUserResponse;
  me: MeUserResponse;
};


export type MutationAddPostArgs = {
  data: AddPostInput;
};


export type MutationEditPostArgs = {
  data: EditPostInput;
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  data: RegisterUserInput;
};


export type MutationLoginArgs = {
  data: LoginUserInput;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  posts: GetPostsResponse;
  post: GetPostResponse;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type RegisterUserData = {
  __typename?: 'RegisterUserData';
  newUser: User;
};

export type RegisterUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterUserResponse = {
  __typename?: 'RegisterUserResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  data?: Maybe<RegisterUserData>;
  errors?: Maybe<Array<FieldError>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  registerData: RegisterUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterUserResponse', status: number, message: string, code: string, data?: Maybe<{ __typename?: 'RegisterUserData', newUser: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, type: string, label: string, message: string }>> } };


export const RegisterDocument = gql`
    mutation Register($registerData: RegisterUserInput!) {
  register(data: $registerData) {
    status
    message
    code
    data {
      newUser {
        id
        createdAt
        updatedAt
        username
      }
    }
    errors {
      path
      type
      label
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};