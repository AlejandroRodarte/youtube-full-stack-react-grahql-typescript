import React, { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import Wrapper from '../components/ui/wrappers/Wrapper'
import { RegisterArgsErrors } from '../types/graphql/args/users/register'
import { RegisterUserInput, useRegisterMutation, RegisterMutationVariables } from '../generated/graphql'
import mapFieldErrors from '../util/common/functions/map-field-errors'
import unflatten from '../util/common/functions/unflatten-object'
import { useRouter } from 'next/router'
import CredentialsForm from '../components/ui/forms/auth/CredentialsForm'
import { CredentialsForm as CredentialsFormInterface } from './../types/forms'

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const credentialsFormInitialValues: CredentialsFormInterface = {
    username: '',
    password: ''
  }

  const router = useRouter()
  const [, register] = useRegisterMutation()

  const onSubmit = useCallback(async (
    form: CredentialsFormInterface,
    { setErrors }: FormikHelpers<CredentialsFormInterface>
  ) => {
    const registerUserInput: RegisterUserInput = form
    const registerArgsInput: RegisterMutationVariables = { registerData: registerUserInput }

    const response = await register(registerArgsInput)

    if (response.data?.register.errors) {
      const mappedFieldErrors = mapFieldErrors(response.data.register.errors)
      const unflattenedErrors = unflatten<RegisterArgsErrors>(mappedFieldErrors)
      setErrors(unflattenedErrors.data)
      return
    }

    if (response.data?.register.data) {
      router.push('/')
    }
  }, [register, router])

  return (
    <Wrapper>
      <CredentialsForm
        initialValues={ credentialsFormInitialValues }
        onSubmit={ onSubmit }
        submitButtonText="Register"
      />
    </Wrapper>
  )
}

export default Register
