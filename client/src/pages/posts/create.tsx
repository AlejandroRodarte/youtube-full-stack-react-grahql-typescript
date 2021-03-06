import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

import { AddPostInput, AddPostMutationVariables, useAddPostMutation, useLogoutMutation } from '../../generated/graphql'

import SimpleForm from '../../components/ui/forms/SimpleForm'
import MainLayout from '../../layouts/MainLayout'
import withAuth, { AuthProps } from '../../hoc/withAuth'
import connect, { MapDispatchToPropsFunction } from '../../hoc/connect'

import commonFunctions from '../../util/common/functions'

import nextUrqlClientConfig from '../../graphql/urql/next-urql-client-config'
import * as pagesModuleHomeTypes from '../../context/store/modules/pages/home/types'

import { GraphQLPostsArgs } from '../../types/graphql/args/posts'
import { FormTypes } from '../../types/forms'

interface StateProps {}
interface DispatchProps {
  onRegisterNewPost: (id: number) => void
}

type AdditionalCreatePostProps = DispatchProps & AuthProps
interface CreatePostProps extends AdditionalCreatePostProps {}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps> = (dispatch) => ({
  onRegisterNewPost: (id) => dispatch({ type: pagesModuleHomeTypes.REGISTER_NEW_POST, payload: { id } })
})

const CreatePost: React.FC<CreatePostProps> = ({ me, onRegisterNewPost }: CreatePostProps) => {
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
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()

  const onSubmit = async (
    form: FormTypes.CreatePostForm,
    { setErrors }: FormikHelpers<FormTypes.CreatePostForm>
  ) => {
    const loginInput: AddPostInput = form
    const addPostArgsInput: AddPostMutationVariables = { addPostData: loginInput }

    const response = await addPost(addPostArgsInput)

    if (response.data) {
      const { data, errors } = response.data.addPost

      if (errors) {
        const mappedFieldErrors = commonFunctions.mapFieldErrors(errors)
        const unflattenedErrors = commonFunctions.unflatten<GraphQLPostsArgs.AddPostArgsErrors>(mappedFieldErrors)
        setErrors(unflattenedErrors.data)
      }

      if (data) {
        onRegisterNewPost(data.newPost.id)
        router.push('/')
      }
    }
  }

  const onLogout = useCallback(async () => {
    await logout()
  }, [logout])

  return (
    <MainLayout
      variant="small"
      me={ me }
      logout={
        {
          handler: onLogout,
          loading: logoutFetching
        }
      }
    >
      <SimpleForm
        initialValues={ createPostFormInitialValues }
        fieldsConfig={ createPostFormFieldsConfig }
        onSubmit={ onSubmit }
        submitButtonText="Create post"
      />
      <NextLink href="/">
        <Link>Go to home</Link>
      </NextLink>
    </MainLayout>
  )
}

export default withUrqlClient(nextUrqlClientConfig, { ssr: false })(withAuth(connect<StateProps, DispatchProps, CreatePostProps>(undefined, mapDispatchToProps)(CreatePost)))
