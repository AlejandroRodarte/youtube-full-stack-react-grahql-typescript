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
  text: Scalars['String'];
};

export type AddPostResponse = {
  __typename?: 'AddPostResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<AddPostData>;
  errors?: Maybe<Array<FieldError>>;
};

export type ChangePasswordData = {
  __typename?: 'ChangePasswordData';
  updatedUser: User;
};

export type ChangePasswordFormInput = {
  newPassword: Scalars['String'];
};

export type ChangePasswordInput = {
  token: Scalars['String'];
  form: ChangePasswordFormInput;
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<ChangePasswordData>;
  errors?: Maybe<Array<FieldError>>;
};

export type DeletePostData = {
  __typename?: 'DeletePostData';
  id: Scalars['Int'];
};

export type DeletePostInput = {
  id: Scalars['Int'];
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<DeletePostData>;
  errors?: Maybe<Array<FieldError>>;
};

export type EditPostData = {
  __typename?: 'EditPostData';
  updatedPost: Post;
};

export type EditPostInput = {
  id: Scalars['Int'];
  fields: OptionalPostFieldsInput;
};

export type EditPostResponse = {
  __typename?: 'EditPostResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
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
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<ForgotPasswordData>;
  errors?: Maybe<Array<FieldError>>;
};

export type LoginData = {
  __typename?: 'LoginData';
  user: User;
};

export type LoginInput = {
  credential: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<LoginData>;
  errors?: Maybe<Array<FieldError>>;
};

export type LogoutData = {
  __typename?: 'LogoutData';
  wasSessionDestroyed: Scalars['Boolean'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<LogoutData>;
  errors?: Maybe<Array<FieldError>>;
};

export type MeData = {
  __typename?: 'MeData';
  user: User;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<MeData>;
  errors?: Maybe<Array<FieldError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: AddPostResponse;
  editPost: EditPostResponse;
  deletePost: DeletePostResponse;
  register: RegisterResponse;
  login: LoginResponse;
  logout: LogoutResponse;
  changePassword: ChangePasswordResponse;
  forgotPassword: ForgotPasswordResponse;
  vote: VoteResponse;
};

export type MutationAddPostArgs = {
  data: AddPostInput;
  namespace: Scalars['String'];
};

export type MutationEditPostArgs = {
  data: EditPostInput;
  namespace: Scalars['String'];
};

export type MutationDeletePostArgs = {
  data: DeletePostInput;
  namespace: Scalars['String'];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
  namespace: Scalars['String'];
};

export type MutationLoginArgs = {
  data: LoginInput;
  namespace: Scalars['String'];
};

export type MutationLogoutArgs = {
  namespace: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
  namespace: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
  namespace: Scalars['String'];
};

export type MutationVoteArgs = {
  data: VoteInput;
  namespace: Scalars['String'];
};

export type OptionalPostFieldsInput = {
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  originalPosterId: Scalars['Float'];
  originalPoster: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type PostData = {
  __typename?: 'PostData';
  post: Post;
};

export type PostInput = {
  id: Scalars['Int'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<PostData>;
  errors?: Maybe<Array<FieldError>>;
};

export type PostsData = {
  __typename?: 'PostsData';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type PostsInput = {
  limit: Scalars['Int'];
  sort: Scalars['String'];
  cursor?: Maybe<Scalars['String']>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<PostsData>;
  errors?: Maybe<Array<FieldError>>;
};

export type Query = {
  __typename?: 'Query';
  posts: PostsResponse;
  post: PostResponse;
  me: MeResponse;
};

export type QueryPostsArgs = {
  data: PostsInput;
  namespace: Scalars['String'];
};

export type QueryPostArgs = {
  data: PostInput;
  namespace: Scalars['String'];
};

export type QueryMeArgs = {
  namespace: Scalars['String'];
};

export type RegisterData = {
  __typename?: 'RegisterData';
  newUser: User;
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<RegisterData>;
  errors?: Maybe<Array<FieldError>>;
};

export type Updoot = {
  __typename?: 'Updoot';
  userId: Scalars['Float'];
  postId: Scalars['Float'];
  value: Scalars['Float'];
  user: User;
  post: Post;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type VoteData = {
  __typename?: 'VoteData';
  updoot: Updoot;
  postPoints: Scalars['Int'];
};

export type VoteInput = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

export type VoteResponse = {
  __typename?: 'VoteResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
  code: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  data?: Maybe<VoteData>;
  errors?: Maybe<Array<FieldError>>;
};

export type AddPostMutationVariables = Exact<{
  addPostData: AddPostInput;
}>;

export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'AddPostResponse', status: number, message: string, code: string, namespace?: Maybe<string>, data?: Maybe<{ __typename?: 'AddPostData', newPost: { __typename: 'Post', id: number, createdAt: string, updatedAt: string, title: string, textSnippet: string, points: number, originalPoster: { __typename?: 'User', id: number, username: string } } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type PostsQueryVariables = Exact<{
  postsData: PostsInput;
}>;

export type PostsQuery = { __typename?: 'Query', posts: { __typename: 'PostsResponse', status: number, message: string, code: string, namespace?: Maybe<string>, data?: Maybe<{ __typename: 'PostsData', hasMore: boolean, posts: Array<{ __typename: 'Post', id: number, createdAt: string, updatedAt: string, title: string, textSnippet: string, points: number, originalPoster: { __typename?: 'User', id: number, username: string } }> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type VoteMutationVariables = Exact<{
  voteData: VoteInput;
}>;

export type VoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'VoteResponse', status: number, message: string, code: string, namespace?: Maybe<string>, data?: Maybe<{ __typename?: 'VoteData', postPoints: number, updoot: { __typename?: 'Updoot', value: number } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordData: ChangePasswordInput;
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordResponse', status: number, message: string, code: string, namespace?: Maybe<string>, data?: Maybe<{ __typename?: 'ChangePasswordData', updatedUser: { __typename?: 'User', id: number, username: string, email?: Maybe<string> } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordData: ForgotPasswordInput;
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', status: number, message: string, code: string, namespace?: Maybe<string>, data?: Maybe<{ __typename?: 'ForgotPasswordData', wasEmailSent: boolean }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type LoginMutationVariables = Exact<{
  loginData: LoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', status: number, message: string, code: string, namespace?: Maybe<string>, data?: Maybe<{ __typename?: 'LoginData', user: { __typename?: 'User', id: number, username: string, email?: Maybe<string> } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;

export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', status: number, message: string, code: string, namespace?: Maybe<string>, data?: Maybe<{ __typename?: 'LogoutData', wasSessionDestroyed: boolean }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type RegisterMutationVariables = Exact<{
  registerData: RegisterInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', status: number, message: string, code: string, namespace?: Maybe<string>, data?: Maybe<{ __typename?: 'RegisterData', newUser: { __typename?: 'User', id: number, username: string, email?: Maybe<string> } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;

export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeResponse', status: number, message: string, code: string, namespace?: Maybe<string>, data?: Maybe<{ __typename?: 'MeData', user: { __typename?: 'User', id: number, username: string, email?: Maybe<string> } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type MyStatusQueryVariables = Exact<{ [key: string]: never; }>;

export type MyStatusQuery = { __typename?: 'Query', me: { __typename?: 'MeResponse', status: number } };

export const AddPostDocument = gql`
    mutation AddPost($addPostData: AddPostInput!) {
  addPost(namespace: "AddPost", data: $addPostData) {
    status
    message
    code
    namespace
    data {
      newPost {
        __typename
        id
        createdAt
        updatedAt
        title
        textSnippet
        points
        originalPoster {
          id
          username
        }
      }
    }
    errors {
      path
      message
    }
  }
}
    `

export function useAddPostMutation () {
  return Urql.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument)
};
export const PostsDocument = gql`
    query Posts($postsData: PostsInput!) {
  posts(namespace: "Posts", data: $postsData) {
    __typename
    status
    message
    code
    namespace
    data {
      __typename
      hasMore
      posts {
        __typename
        id
        createdAt
        updatedAt
        title
        textSnippet
        points
        originalPoster {
          id
          username
        }
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
export const VoteDocument = gql`
    mutation Vote($voteData: VoteInput!) {
  vote(namespace: "Vote", data: $voteData) {
    status
    message
    code
    namespace
    data {
      updoot {
        value
      }
      postPoints
    }
    errors {
      path
      message
    }
  }
}
    `

export function useVoteMutation () {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument)
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($changePasswordData: ChangePasswordInput!) {
  changePassword(namespace: "ChangePassword", data: $changePasswordData) {
    status
    message
    code
    namespace
    data {
      updatedUser {
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

export function useChangePasswordMutation () {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument)
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordData: ForgotPasswordInput!) {
  forgotPassword(namespace: "ForgotPassword", data: $forgotPasswordData) {
    status
    message
    code
    namespace
    data {
      wasEmailSent
    }
    errors {
      path
      message
    }
  }
}
    `

export function useForgotPasswordMutation () {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument)
};
export const LoginDocument = gql`
    mutation Login($loginData: LoginInput!) {
  login(namespace: "Login", data: $loginData) {
    status
    message
    code
    namespace
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
  logout(namespace: "Logout") {
    status
    message
    code
    namespace
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
  register(namespace: "Register", data: $registerData) {
    status
    message
    code
    namespace
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
  me(namespace: "Me") {
    status
    message
    code
    namespace
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
export const MyStatusDocument = gql`
    query MyStatus {
  me(namespace: "MyStatus") {
    status
  }
}
    `

export function useMyStatusQuery (options: Omit<Urql.UseQueryArgs<MyStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyStatusQuery>({ query: MyStatusDocument, ...options })
};
