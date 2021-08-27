import React, { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import Wrapper from '../components/ui/wrappers/Wrapper'
import { RegisterArgsErrors } from '../types/graphql/args/users/register'
import { RegisterInput, useRegisterMutation, RegisterMutationVariables } from '../generated/graphql'
import mapFieldErrors from '../util/common/functions/map-field-errors'
import unflatten from '../util/common/functions/unflatten-object'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import nextUrqlClientConfig from '../graphql/urql/client-config'
import { RegisterForm, FormFieldsConfig } from '../types/forms'
import SimpleForm from '../components/ui/forms/SimpleForm'

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const registerFormInitialValues: RegisterForm = {
    username: '',
    email: '',
    password: ''
  }

  const registerFormFieldsConfig: FormFieldsConfig<RegisterForm> = {
    username: {
      name: 'username',
      type: 'text',
      placeholder: 'e.g. gyrfalke',
      label: 'Username'
    },
    email: {
      name: 'email',
      type: 'email',
      placeholder: 'e.g. gyrfalke@gmail.com',
      label: 'Email'
    },
    password: {
      name: 'password',
      type: 'password',
      placeholder: 'secret',
      label: 'Password'
    }
  }

  const router = useRouter()
  const [, register] = useRegisterMutation()

  const onSubmit = useCallback(async (
    form: RegisterForm,
    { setErrors }: FormikHelpers<RegisterForm>
  ) => {
    const registerInput: RegisterInput = form
    const registerArgsInput: RegisterMutationVariables = { registerData: registerInput }

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
      <SimpleForm
        initialValues={ registerFormInitialValues }
        fieldsConfig={ registerFormFieldsConfig }
        onSubmit={ onSubmit }
        submitButtonText="Register"
      />
    </Wrapper>
  )
}

export default withUrqlClient(nextUrqlClientConfig)(Register)
