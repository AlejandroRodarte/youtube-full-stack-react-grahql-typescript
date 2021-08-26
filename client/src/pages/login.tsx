import React from 'react'
import { FormikHelpers } from 'formik'
import Wrapper from '../components/ui/wrappers/Wrapper'
import { LoginArgsErrors } from '../types/graphql/args/users/login'
import { LoginUserInput, useLoginMutation, LoginMutationVariables } from '../generated/graphql'
import mapFieldErrors from '../util/common/functions/map-field-errors'
import unflatten from '../util/common/functions/unflatten-object'
import { useRouter } from 'next/router'
import CredentialsForm from '../components/ui/forms/auth/CredentialsForm'
import { CredentialsForm as CredentialsFormInterface } from './../types/forms'

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const credentialsFormInitialValues: CredentialsFormInterface = {
    username: '',
    password: ''
  }

  const router = useRouter()
  const [, login] = useLoginMutation()

  const onSubmit = async (
    form: CredentialsFormInterface,
    { setErrors }: FormikHelpers<CredentialsFormInterface>
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
  }

  return (
    <Wrapper>
      <CredentialsForm
        initialValues={ credentialsFormInitialValues }
        onSubmit={ onSubmit }
        submitButtonText="Login"
      />
    </Wrapper>
  )
}

export default Login
