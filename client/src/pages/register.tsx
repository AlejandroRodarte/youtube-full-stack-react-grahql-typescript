import React, { useCallback } from 'react'
import { FormikHelpers } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'

import { RegisterInput, useRegisterMutation, RegisterMutationVariables } from '../generated/graphql'

import SimpleForm from '../components/ui/forms/SimpleForm'
import Wrapper from '../components/ui/wrappers/Wrapper'
import withAnonymous, { AnonymousProps } from '../hoc/withAnonymous'
import connect, { MapDispatchToPropsFunction } from '../hoc/connect'

import commonFunctions from '../util/common/functions'
import * as pagesModuleHomeTypes from '../context/store/modules/pages/home/types'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'

import { FormTypes } from '../types/forms'
import { GraphQLUsersArgs } from '../types/graphql/args/users'

interface StateProps {}
interface DispatchProps {
  onReset: () => void
}

type AdditionalRegisterProps = AnonymousProps & StateProps & DispatchProps
interface RegisterProps extends AdditionalRegisterProps {}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, RegisterProps> = (dispatch, _) => ({
  onReset: () => dispatch({ type: pagesModuleHomeTypes.RESET })
})

const Register: React.FC<RegisterProps> = ({ wasLoadedOnServer, onReset }: RegisterProps) => {
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
  const { redirectTo = '/' } = router.query

  const [, register] = useRegisterMutation()

  const onSubmit = useCallback(async (
    form: FormTypes.RegisterForm,
    { setErrors }: FormikHelpers<FormTypes.RegisterForm>
  ) => {
    const registerInput: RegisterInput = form
    const registerArgsInput: RegisterMutationVariables = { registerData: registerInput }

    const response = await register(registerArgsInput)

    if (response.data) {
      const { data, errors } = response.data.register

      if (data && !wasLoadedOnServer) {
        onReset()
        router.push(redirectTo as string)
      }

      if (errors) {
        const mappedFieldErrors = commonFunctions.mapFieldErrors(errors)
        const unflattenedErrors = commonFunctions.unflatten<GraphQLUsersArgs.RegisterArgsErrors>(mappedFieldErrors)
        setErrors(unflattenedErrors.data)
      }
    }
  }, [onReset, redirectTo, register, router, wasLoadedOnServer])

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

export default withUrqlClient(nextUrqlClientConfig, { ssr: false })(withAnonymous(connect(undefined, mapDispatchToProps)(Register)))
