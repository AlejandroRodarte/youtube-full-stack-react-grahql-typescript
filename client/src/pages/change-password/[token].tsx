import React, { useCallback, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import Wrapper from '../../components/ui/wrappers/Wrapper'
import SimpleForm from '../../components/ui/forms/SimpleForm'
import { ChangePasswordForm, FormFieldsConfig } from '../../types/forms'
import { FormikHelpers } from 'formik'
import mapFieldErrors from '../../util/common/functions/map-field-errors'
import unflatten from '../../util/common/functions/unflatten-object'
import { ChangePasswordArgsErrors } from '../../types/graphql/args/users/change-password'
import { useChangePasswordMutation, ChangePasswordInput, ChangePasswordMutationVariables } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'
import nextUrqlClientConfig from '../../graphql/urql/client-config'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'

interface ChangePasswordProps {
  token: string
}

const ChangePassword: NextPage<ChangePasswordProps> = ({ token }: ChangePasswordProps) => {
  const changePasswordInitialValues: ChangePasswordForm = {
    newPassword: ''
  }

  const changePasswordFormFieldsConfig: FormFieldsConfig<ChangePasswordForm> = {
    newPassword: {
      name: 'newPassword',
      type: 'password',
      placeholder: 'e.g. your-new-password',
      label: 'New Password'
    }
  }

  const [tokenError, setTokenError] = useState('')

  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation()

  const onSubmit = useCallback(async (
    form: ChangePasswordForm,
    { setErrors }: FormikHelpers<ChangePasswordForm>
  ) => {
    const changePasswordInput: ChangePasswordInput = { token, form }
    const changePasswordArgsInput: ChangePasswordMutationVariables = { changePasswordData: changePasswordInput }

    const response = await changePassword(changePasswordArgsInput)

    if (response.data?.changePassword.errors) {
      const mappedFieldErrors = mapFieldErrors(response.data.changePassword.errors)
      const unflattenedErrors = unflatten<ChangePasswordArgsErrors>(mappedFieldErrors)

      if ('token' in unflattenedErrors.data) {
        setTokenError(() => unflattenedErrors.data.token)
      }
      setErrors(unflattenedErrors.data.form)
    }

    console.log(response)
    if (response.data?.changePassword.data) {
      router.push('/')
    }
  }, [changePassword, router, token])

  return (
    <Wrapper>
      {
        tokenError && (
          <Flex>
            <Box
              color="red"
              mr={ 2 }
            >
              { tokenError }
            </Box>
            <NextLink href="/forgot-password">
              I want a new recovery token
            </NextLink>
          </Flex>
        )
      }
      <SimpleForm
        initialValues={ changePasswordInitialValues }
        fieldsConfig={ changePasswordFormFieldsConfig }
        onSubmit={ onSubmit }
        submitButtonText="Set new password"
      />
    </Wrapper>
  )
}

ChangePassword.getInitialProps = ({ query }: NextPageContext) => {
  return {
    token: typeof query.token === 'string' ? query.token : undefined
  }
}

export default withUrqlClient(nextUrqlClientConfig, { ssr: false })(ChangePassword)
