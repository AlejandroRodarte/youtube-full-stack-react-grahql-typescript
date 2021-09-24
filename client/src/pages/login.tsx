import React, { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import NextLink from 'next/link'
import { Flex, Link } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'

import { LoginInput, useLoginMutation, LoginMutationVariables } from '../generated/graphql'

import Wrapper from '../components/ui/wrappers/Wrapper'
import SimpleForm from '../components/ui/forms/SimpleForm'
import withAnonymous, { AnonymousProps } from '../hoc/withAnonymous'
import connect, { MapDispatchToPropsFunction } from '../hoc/connect'

import commonFunctions from '../util/common/functions'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'
import * as pagesModuleHomeTypes from '../context/store/modules/pages/home/types'

import { FormTypes } from '../types/forms'
import { GraphQLUsersArgs } from '../types/graphql/args/users'

interface StateProps {}
interface DispatchProps {
  onReset: () => void
}

type AdditionalLoginProps = AnonymousProps & StateProps & DispatchProps
interface LoginProps extends AdditionalLoginProps {}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, LoginProps> = (dispatch, _) => ({
  onReset: () => dispatch({ type: pagesModuleHomeTypes.RESET })
})

const Login: React.FC<LoginProps> = ({ wasLoadedOnServer, onReset }: LoginProps) => {
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

    if (response.data) {
      const { data, errors } = response.data.login

      if (data && !wasLoadedOnServer) {
        onReset()
        router.push(redirectTo as string)
      }

      if (errors) {
        const mappedFieldErrors = commonFunctions.mapFieldErrors(errors)
        const unflattenedErrors = commonFunctions.unflatten<GraphQLUsersArgs.LoginArgsErrors>(mappedFieldErrors)
        setErrors(unflattenedErrors.data)
      }
    }
  }, [login, onReset, redirectTo, router, wasLoadedOnServer])

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
      <NextLink href={{ pathname: '/register', query: router.query }}>
        <Link ml="auto">Don&apos;t have an account? Register!</Link>
      </NextLink>
    </Wrapper>
  )
}

export default withUrqlClient(nextUrqlClientConfig, { ssr: false })(withAnonymous(connect(undefined, mapDispatchToProps)(Login)))
