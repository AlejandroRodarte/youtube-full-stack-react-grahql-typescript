import React from 'react'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { withUrqlClient } from 'next-urql'
import { GetServerSideProps } from 'next'

import { AddPostInput, AddPostMutationVariables, useAddPostMutation } from '../../generated/graphql'

import SimpleForm from '../../components/ui/forms/SimpleForm'
import MainLayout from '../../layouts/MainLayout'

import commonFunctions from '../../util/common/functions'
import server from '../../graphql/urql/server'

// import nextUrqlClientConfig from '../../graphql/urql/next-urql-client-config'

import { GraphQLPostsArgs } from '../../types/graphql/args/posts'
import { FormTypes } from '../../types/forms'

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => {
  const createPostFormInitialValues: FormTypes.CreatePostForm = {
    title: '',
    text: ''
  }

  const createPostFormFieldsConfig: FormTypes.FormFieldsConfig<FormTypes.CreatePostForm> = {
    title: {
      type: 'input',
      payload: {
        label: 'Post title',
        htmlAttributes: {
          name: 'title',
          placeholder: 'e.g. My dog is gay bruh',
          type: 'text'
        }
      }
    },
    text: {
      type: 'textarea',
      payload: {
        label: 'Post text',
        htmlAttributes: {
          name: 'text',
          placeholder: 'e.g. He is attracted to other male dogs bruh...'
        }
      }
    }
  }

  const router = useRouter()
  const [, addPost] = useAddPostMutation()

  const onSubmit = async (
    form: FormTypes.CreatePostForm,
    { setErrors }: FormikHelpers<FormTypes.CreatePostForm>
  ) => {
    const loginInput: AddPostInput = form
    const addPostArgsInput: AddPostMutationVariables = { addPostData: loginInput }

    const response = await addPost(addPostArgsInput)

    if (response.data?.addPost.errors) {
      const mappedFieldErrors = commonFunctions.mapFieldErrors(response.data.addPost.errors)
      const unflattenedErrors = commonFunctions.unflatten<GraphQLPostsArgs.AddPostArgsErrors>(mappedFieldErrors)
      setErrors(unflattenedErrors.data)
      return
    }

    if (response.data?.addPost.data) {
      router.push('/')
    }
  }

  return (
    <MainLayout variant="small">
      <SimpleForm
        initialValues={ createPostFormInitialValues }
        fieldsConfig={ createPostFormFieldsConfig }
        onSubmit={ onSubmit }
        submitButtonText="Create post"
      />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<CreatePostProps> = async (ctx) => {
  const [client, ssrExchange] = server.getUrqlClientForServerSideProps(ctx)
  const [isStatusCodeCorrect] = await server.common.auth.checkMyStatusCode(client, 200)

  if (typeof isStatusCodeCorrect === 'undefined') return { props: {} }
  if (isStatusCodeCorrect) return { props: { urqlState: ssrExchange.extractData() } }

  return {
    redirect: {
      destination: `/login?redirectTo=${encodeURIComponent('/posts/create')}`,
      permanent: false
    }
  }
}

export default withUrqlClient((ssr, ctx) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
  fetchOptions: {
    credentials: 'include',
    headers: {
      cookie: ctx && ctx.req ? ctx.req.headers.cookie : null
    }
  }
}), { ssr: false })(CreatePost)
