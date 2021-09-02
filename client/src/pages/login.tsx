import React, { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import NextLink from 'next/link'
import { Flex, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { GetServerSideProps } from 'next'

import { LoginInput, useLoginMutation, LoginMutationVariables } from '../generated/graphql'

import Wrapper from '../components/ui/wrappers/Wrapper'
import SimpleForm from '../components/ui/forms/SimpleForm'

import commonFunctions from '../util/common/functions'
import server from '../graphql/urql/server'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'

import { FormTypes } from '../types/forms'
import { GraphQLUsersArgs } from '../types/graphql/args/users'

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const loginFormInitialValues: FormTypes.LoginForm = {
    credential: '',
    password: ''
  }

  const loginFormFieldsConfig: FormTypes.FormFieldsConfig<FormTypes.LoginForm> = {
    credential: {
      type: 'input',
      payload: {
        label: 'Username/Email',
        htmlAttributes: {
          name: 'credential',
          type: 'text',
          placeholder: 'e.g. gyrfalke or gyrfalke@gmail.com'
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
  const { redirectTo = '/' } = router.query

  const [, login] = useLoginMutation()

  const onSubmit = useCallback(async (
    form: FormTypes.LoginForm,
    { setErrors }: FormikHelpers<FormTypes.LoginForm>
  ) => {
    const loginInput: LoginInput = form
    const loginArgsInput: LoginMutationVariables = { loginData: loginInput }

    const response = await login(loginArgsInput)

    if (response.data?.login.errors) {
      const mappedFieldErrors = commonFunctions.mapFieldErrors(response.data.login.errors)
      const unflattenedErrors = commonFunctions.unflatten<GraphQLUsersArgs.LoginArgsErrors>(mappedFieldErrors)
      setErrors(unflattenedErrors.data)
      return
    }

    if (response.data?.login.data) {
      router.push(redirectTo as string)
    }
  }, [login, redirectTo, router])

  return (
    <Wrapper>
      <SimpleForm
        initialValues={ loginFormInitialValues }
        fieldsConfig={ loginFormFieldsConfig }
        onSubmit={ onSubmit }
        submitButtonText="Login"
      />
      <Flex>
        <NextLink href="/forgot-password">
          <Link ml="auto">Forgot your password?</Link>
        </NextLink>
      </Flex>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps<LoginProps> = async (ctx) => {
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

export default withUrqlClient(nextUrqlClientConfig, { ssr: false })(Login)
