import React, { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import Wrapper from '../components/ui/wrappers/Wrapper'
import { LoginArgsErrors } from '../types/graphql/args/users/login'
import { LoginUserInput, useLoginMutation, LoginMutationVariables } from '../generated/graphql'
import mapFieldErrors from '../util/common/functions/map-field-errors'
import unflatten from '../util/common/functions/unflatten-object'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import nextUrqlClientConfig from '../graphql/urql/client-config'
import { LoginForm, FormFieldsConfig } from '../types/forms'
import SimpleForm from '../components/ui/forms/SimpleForm'

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const loginFormInitialValues: LoginForm = {
    username: '',
    password: ''
  }

  const loginFormFieldsConfig: FormFieldsConfig<LoginForm> = {
    username: {
      name: 'username',
      type: 'text',
      placeholder: 'e.g. gyrfalke',
      label: 'Username'
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
    const loginUserInput: LoginUserInput = form
    const loginArgsInput: LoginMutationVariables = { loginData: loginUserInput }

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
    </Wrapper>
  )
}

export default withUrqlClient(nextUrqlClientConfig)(Login)
