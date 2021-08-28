import React, { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import Wrapper from '../components/ui/wrappers/Wrapper'
import { LoginArgsErrors } from '../types/graphql/args/users/login'
import { LoginInput, useLoginMutation, LoginMutationVariables } from '../generated/graphql'
import mapFieldErrors from '../util/common/functions/map-field-errors'
import unflatten from '../util/common/functions/unflatten-object'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'
import { LoginForm, FormFieldsConfig } from '../types/forms'
import SimpleForm from '../components/ui/forms/SimpleForm'
import NextLink from 'next/link'
import { Flex, Link } from '@chakra-ui/react'
import withAnonymous from '../hoc/withAnonymous'

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const loginFormInitialValues: LoginForm = {
    credential: '',
    password: ''
  }

  const loginFormFieldsConfig: FormFieldsConfig<LoginForm> = {
    credential: {
      name: 'credential',
      type: 'text',
      placeholder: 'e.g. gyrfalke or gyrfalke@gmail.com',
      label: 'Username/Email'
    },
    password: {
      name: 'password',
      type: 'password',
      placeholder: 'secret',
      label: 'Password'
    }
  }

  const router = useRouter()
  const [, login] = useLoginMutation()

  const onSubmit = useCallback(async (
    form: LoginForm,
    { setErrors }: FormikHelpers<LoginForm>
  ) => {
    const loginInput: LoginInput = form
    const loginArgsInput: LoginMutationVariables = { loginData: loginInput }

    const response = await login(loginArgsInput)

    if (response.data?.login.errors) {
      const mappedFieldErrors = mapFieldErrors(response.data.login.errors)
      const unflattenedErrors = unflatten<LoginArgsErrors>(mappedFieldErrors)
      setErrors(unflattenedErrors.data)
      return
    }

    if (response.data?.login.data) {
      router.push('/')
    }
  }, [login, router])

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

export default withUrqlClient(nextUrqlClientConfig, { ssr: true })(withAnonymous(Login))
