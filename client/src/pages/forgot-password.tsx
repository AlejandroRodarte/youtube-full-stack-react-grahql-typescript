import React, { useCallback, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { FormikHelpers } from 'formik'

import { ForgotPasswordInput, ForgotPasswordMutationVariables, useForgotPasswordMutation } from '../generated/graphql'

import Wrapper from '../components/ui/wrappers/Wrapper'
import SimpleForm from '../components/ui/forms/SimpleForm'
import withAnonymous, { AnonymousProps } from '../hoc/withAnonymous'

import commonFunctions from '../util/common/functions'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'

import { GraphQLUsersArgs } from '../types/graphql/args/users'
import { FormTypes } from '../types/forms'

interface ForgotPasswordProps extends AnonymousProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const forgotPasswordInitialValues: FormTypes.ForgotPasswordForm = {
    email: ''
  }

  const forgotPasswordFormFieldsConfig: FormTypes.FormFieldsConfig<FormTypes.ForgotPasswordForm> = {
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
    }
  }

  const [operationComplete, setOperationComplete] = useState(false)

  const [, forgotPassword] = useForgotPasswordMutation()

  const onSubmit = useCallback(async (
    form: FormTypes.ForgotPasswordForm,
    { setErrors }: FormikHelpers<FormTypes.ForgotPasswordForm>
  ) => {
    const forgotPasswordInput: ForgotPasswordInput = form
    const forgotPasswordArgsInput: ForgotPasswordMutationVariables = { forgotPasswordData: forgotPasswordInput }

    const response = await forgotPassword(forgotPasswordArgsInput)

    if (response.data?.forgotPassword.errors) {
      const mappedFieldErrors = commonFunctions.mapFieldErrors(response.data.forgotPassword.errors)
      const unflattenedErrors = commonFunctions.unflatten<GraphQLUsersArgs.ForgotPasswordArgsErrors>(mappedFieldErrors)
      setErrors(unflattenedErrors.data)
      return
    }

    if (response.data?.forgotPassword.data) {
      setOperationComplete(() => true)
    }
  }, [forgotPassword])

  return (
    <Wrapper>
      {
        !operationComplete
          ? (
              <SimpleForm
                initialValues={ forgotPasswordInitialValues }
                fieldsConfig={ forgotPasswordFormFieldsConfig }
                onSubmit={ onSubmit }
                submitButtonText="Send recovery email"
              />
            )
          : (
              <Box>
                If an account with that email exists, we sent you a recovery email message.
              </Box>
            )
      }
    </Wrapper>
  )
}

export default withUrqlClient(nextUrqlClientConfig, { ssr: false })(withAnonymous(ForgotPassword))
