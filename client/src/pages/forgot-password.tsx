import React, { useCallback, useState } from 'react'
import Wrapper from '../components/ui/wrappers/Wrapper'
import SimpleForm from '../components/ui/forms/SimpleForm'
import { ForgotPasswordForm, FormFieldsConfig } from '../types/forms'
import { ForgotPasswordInput, ForgotPasswordMutationVariables, useForgotPasswordMutation } from '../generated/graphql'
import { FormikHelpers } from 'formik'
import mapFieldErrors from '../util/common/functions/map-field-errors'
import { ForgotPasswordArgsErrors } from '../types/graphql/args/users/forgot-password'
import unflatten from '../util/common/functions/unflatten-object'
import { Box } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import clientConfig from '../graphql/urql/client-config'

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const forgotPasswordInitialValues: ForgotPasswordForm = {
    email: ''
  }

  const forgotPasswordFormFieldsConfig: FormFieldsConfig<ForgotPasswordForm> = {
    email: {
      name: 'email',
      type: 'email',
      placeholder: 'e.g. gyrfalke@gmail.com',
      label: 'Email'
    }
  }

  const [operationComplete, setOperationComplete] = useState(false)

  const [, forgotPassword] = useForgotPasswordMutation()

  const onSubmit = useCallback(async (
    form: ForgotPasswordForm,
    { setErrors }: FormikHelpers<ForgotPasswordForm>
  ) => {
    const forgotPasswordInput: ForgotPasswordInput = form
    const forgotPasswordArgsInput: ForgotPasswordMutationVariables = { forgotPasswordData: forgotPasswordInput }

    const response = await forgotPassword(forgotPasswordArgsInput)

    if (response.data?.forgotPassword.errors) {
      const mappedFieldErrors = mapFieldErrors(response.data.forgotPassword.errors)
      const unflattenedErrors = unflatten<ForgotPasswordArgsErrors>(mappedFieldErrors)
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

export default withUrqlClient(clientConfig, { ssr: false })(ForgotPassword)
