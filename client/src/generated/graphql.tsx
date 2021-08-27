import gql from 'graphql-tag'
import * as Urql from 'urql'
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
  _kind?: Maybe<Scalars['String']>;
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
  _kind?: Maybe<Scalars['String']>;
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
  _kind?: Maybe<Scalars['String']>;
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

export type ForgotPasswordData = {
  __typename?: 'ForgotPasswordData';
  wasEmailSent: Scalars['Boolean'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  _kind?: Maybe<Scalars['String']>;
  data?: Maybe<ForgotPasswordData>;
  errors?: Maybe<Array<FieldError>>;
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
  _kind?: Maybe<Scalars['String']>;
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
  _kind?: Maybe<Scalars['String']>;
  data?: Maybe<GetPostsData>;
  errors?: Maybe<Array<FieldError>>;
};

export type LoginUserData = {
  __typename?: 'LoginUserData';
  user: User;
};

export type LoginInput = {
  credential: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  _kind?: Maybe<Scalars['String']>;
  data?: Maybe<LoginUserData>;
  errors?: Maybe<Array<FieldError>>;
};

export type LogoutUserData = {
  __typename?: 'LogoutUserData';
  wasSessionDestroyed: Scalars['Boolean'];
};

export type LogoutUserResponse = {
  __typename?: 'LogoutUserResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  _kind?: Maybe<Scalars['String']>;
  data?: Maybe<LogoutUserData>;
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
  _kind?: Maybe<Scalars['String']>;
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
  logout: LogoutUserResponse;
  forgotPassword: ForgotPasswordResponse;
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
  data: RegisterInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
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
  me: MeUserResponse;
};

export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type RegisterUserData = {
  __typename?: 'RegisterUserData';
  newUser: User;
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterUserResponse = {
  __typename?: 'RegisterUserResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  _kind?: Maybe<Scalars['String']>;
  data?: Maybe<RegisterUserData>;
  errors?: Maybe<Array<FieldError>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;

export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'GetPostsResponse', status: number, message: string, code: string, _kind?: Maybe<string>, data?: Maybe<{ __typename?: 'GetPostsData', posts: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string }> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type LoginMutationVariables = Exact<{
  loginData: LoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginUserResponse', status: number, message: string, code: string, _kind?: Maybe<string>, data?: Maybe<{ __typename?: 'LoginUserData', user: { __typename?: 'User', id: number, username: string, email: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;

export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutUserResponse', status: number, message: string, code: string, _kind?: Maybe<string>, data?: Maybe<{ __typename?: 'LogoutUserData', wasSessionDestroyed: boolean }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type RegisterMutationVariables = Exact<{
  registerData: RegisterInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterUserResponse', status: number, message: string, code: string, _kind?: Maybe<string>, data?: Maybe<{ __typename?: 'RegisterUserData', newUser: { __typename?: 'User', id: number, username: string, email: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;

export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeUserResponse', status: number, message: string, code: string, _kind?: Maybe<string>, data?: Maybe<{ __typename?: 'MeUserData', user: { __typename?: 'User', id: number, username: string, email: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export const PostsDocument = gql`
    query Posts {
  posts {
    status
    message
    code
    _kind
    data {
      posts {
        id
        createdAt
        updatedAt
        title
      }
    }
    errors {
      path
      message
    }
  }
}
    `

export function usePostsQuery (options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options })
};
export const LoginDocument = gql`
    mutation Login($loginData: LoginInput!) {
  login(data: $loginData) {
    status
    message
    code
    _kind
    data {
      user {
        id
        username
        email
      }
    }
    errors {
      path
      message
    }
  }
}
    `

export function useLoginMutation () {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    status
    message
    code
    _kind
    data {
      wasSessionDestroyed
    }
    errors {
      path
      message
    }
  }
}
    `

export function useLogoutMutation () {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument)
};
export const RegisterDocument = gql`
    mutation Register($registerData: RegisterInput!) {
  register(data: $registerData) {
    status
    message
    code
    _kind
    data {
      newUser {
        id
        username
        email
      }
    }
    errors {
      path
      message
    }
  }
}
    `

export function useRegisterMutation () {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument)
};
export const MeDocument = gql`
    query Me {
  me {
    status
    message
    code
    _kind
    data {
      user {
        id
        username
        email
      }
    }
    errors {
      path
      message
    }
  }
}
    `

export function useMeQuery (options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options })
};
