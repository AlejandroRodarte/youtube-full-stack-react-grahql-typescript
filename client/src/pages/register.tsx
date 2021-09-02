import React, { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { GetServerSideProps } from 'next'

import { RegisterInput, useRegisterMutation, RegisterMutationVariables } from '../generated/graphql'

import SimpleForm from '../components/ui/forms/SimpleForm'
import Wrapper from '../components/ui/wrappers/Wrapper'

import commonFunctions from '../util/common/functions'
import server from '../graphql/urql/server'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'

import { FormTypes } from '../types/forms'
import { GraphQLUsersArgs } from '../types/graphql/args/users'

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const registerFormInitialValues: FormTypes.RegisterForm = {
    username: '',
    email: '',
    password: ''
  }

  const registerFormFieldsConfig: FormTypes.FormFieldsConfig<FormTypes.RegisterForm> = {
    username: {
      type: 'input',
      payload: {
        label: 'Username',
        htmlAttributes: {
          name: 'username',
          type: 'text',
          placeholder: 'e.g. gyrfalke'
        }
      }
    },
    email: {
      type: 'input',
      payload: {
        label: 'Email',
        htmlAttributes: {
          name: 'email',
          type: 'text',
          placeholder: 'e.g. gyrfalke@gmail.com'
        }
      }
    },
    password: {
      type: 'input',
      payload: {
        label: 'Password',
        htmlAttributes: {
          name: 'password',
          type: 'password',
          placeholder: 'secret'
        }
      }
    }
  }

  const router = useRouter()
  const [, register] = useRegisterMutation()

  const onSubmit = useCallback(async (
    form: FormTypes.RegisterForm,
    { setErrors }: FormikHelpers<FormTypes.RegisterForm>
  ) => {
    const registerInput: RegisterInput = form
    const registerArgsInput: RegisterMutationVariables = { registerData: registerInput }

    const response = await register(registerArgsInput)

    if (response.data?.register.errors) {
      const mappedFieldErrors = commonFunctions.mapFieldErrors(response.data.register.errors)
      const unflattenedErrors = commonFunctions.unflatten<GraphQLUsersArgs.RegisterArgsErrors>(mappedFieldErrors)
      setErrors(unflattenedErrors.data)
      return
    }

    if (response.data?.register.data) {
      router.push('/')
    }
  }, [register, router])

  return (
    <Wrapper>
      <SimpleForm
        initialValues={ registerFormInitialValues }
        fieldsConfig={ registerFormFieldsConfig }
        onSubmit={ onSubmit }
        submitButtonText="Register"
      />
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps<RegisterProps> = async (ctx) => {
  const client = server.getUrqlClientForServerSideProps(ctx)
  const [isStatusCodeCorrect] = await server.common.auth.checkMyStatusCode(client, 401)

  if (typeof isStatusCodeCorrect === 'undefined') return { props: {} }
  if (isStatusCodeCorrect) return { props: {} }

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

export default withUrqlClient(nextUrqlClientConfig, { ssr: false })(Register)
