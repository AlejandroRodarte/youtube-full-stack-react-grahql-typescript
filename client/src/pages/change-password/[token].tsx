import React, { useCallback, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { FormikHelpers } from 'formik'

import { useChangePasswordMutation, ChangePasswordInput, ChangePasswordMutationVariables } from '../../generated/graphql'

import Wrapper from '../../components/ui/wrappers/Wrapper'
import SimpleForm from '../../components/ui/forms/SimpleForm'

import commonFunctions from '../../util/common/functions'
import server from '../../graphql/urql/server'

import nextUrqlClientConfig from '../../graphql/urql/next-urql-client-config'

import { FormTypes } from '../../types/forms'
import { GraphQLUsersArgs } from '../../types/graphql/args/users'

interface ChangePasswordProps {
  token: string
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ token }: ChangePasswordProps) => {
  const changePasswordInitialValues: FormTypes.ChangePasswordForm = {
    newPassword: ''
  }

  const changePasswordFormFieldsConfig: FormTypes.FormFieldsConfig<FormTypes.ChangePasswordForm> = {
    newPassword: {
      type: 'input',
      payload: {
        label: 'New Password',
        htmlAttributes: {
          name: 'newPassword',
          type: 'password',
          placeholder: 'e.g. your-new-password'
        }
      }
    }
  }

  const [tokenError, setTokenError] = useState('')

  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation()

  const onSubmit = useCallback(async (
    form: FormTypes.ChangePasswordForm,
    { setErrors }: FormikHelpers<FormTypes.ChangePasswordForm>
  ) => {
    const changePasswordInput: ChangePasswordInput = { token, form }
    const changePasswordArgsInput: ChangePasswordMutationVariables = { changePasswordData: changePasswordInput }

    const response = await changePassword(changePasswordArgsInput)

    if (response.data?.changePassword.errors) {
      const mappedFieldErrors = commonFunctions.mapFieldErrors(response.data.changePassword.errors)
      const unflattenedErrors = commonFunctions.unflatten<GraphQLUsersArgs.ChangePasswordArgsErrors>(mappedFieldErrors)

      if ('token' in unflattenedErrors.data) {
        setTokenError(() => unflattenedErrors.data.token)
      }
      setErrors(unflattenedErrors.data.form)
    }

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

export const getServerSideProps: GetServerSideProps<ChangePasswordProps> = async (ctx) => {
  const [client, ssrExchange] = server.getUrqlClientForServerSideProps(ctx)
  const [isStatusCodeCorrect] = await server.common.auth.checkMyStatusCode(client, 401)

  const response = {
    props: {
      token: typeof ctx.query.token === 'string' ? ctx.query.token : undefined,
      urqlState: ssrExchange.extractData()
    }
  }

  if (typeof isStatusCodeCorrect === 'undefined') return response
  if (isStatusCodeCorrect) return response

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

export default withUrqlClient(nextUrqlClientConfig, { ssr: false })(ChangePassword)
