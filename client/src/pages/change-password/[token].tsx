import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { FormikHelpers } from 'formik'

import { useChangePasswordMutation, ChangePasswordInput, ChangePasswordMutationVariables } from '../../generated/graphql'

import Wrapper from '../../components/ui/wrappers/Wrapper'
import SimpleForm from '../../components/ui/forms/SimpleForm'
import withAnonymous, { AnonymousProps } from '../../hoc/withAnonymous'
import connect, { MapDispatchToPropsFunction } from '../../hoc/connect'

import commonFunctions from '../../util/common/functions'
import * as pagesModuleHomeTypes from '../../context/store/modules/pages/home/types'

import nextUrqlClientConfig from '../../graphql/urql/next-urql-client-config'

import { FormTypes } from '../../types/forms'
import { GraphQLUsersArgs } from '../../types/graphql/args/users'

interface StateProps {}
interface DispatchProps {
  onReset: () => void
}

type AdditionalChangePasswordProps = AnonymousProps & StateProps & DispatchProps
interface ChangePasswordProps extends AdditionalChangePasswordProps {}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, ChangePasswordProps> = (dispatch, _) => ({
  onReset: () => dispatch({ type: pagesModuleHomeTypes.RESET })
})

const ChangePassword: React.FC<ChangePasswordProps> = ({ onReset }: ChangePasswordProps) => {
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
  const token = router.query.token as string

  const [, changePassword] = useChangePasswordMutation()

  const onSubmit = useCallback(async (
    form: FormTypes.ChangePasswordForm,
    { setErrors }: FormikHelpers<FormTypes.ChangePasswordForm>
  ) => {
    const changePasswordInput: ChangePasswordInput = { token, form }
    const changePasswordArgsInput: ChangePasswordMutationVariables = { changePasswordData: changePasswordInput }

    const response = await changePassword(changePasswordArgsInput)

    if (response.data) {
      const { data, errors } = response.data.changePassword

      if (data) {
        onReset()
        router.push('/')
      }

      if (errors) {
        const mappedFieldErrors = commonFunctions.mapFieldErrors(errors)
        const unflattenedErrors = commonFunctions.unflatten<GraphQLUsersArgs.ChangePasswordArgsErrors>(mappedFieldErrors)

        if ('token' in unflattenedErrors.data) {
          setTokenError(() => unflattenedErrors.data.token)
        }
        setErrors(unflattenedErrors.data.form)
      }
    }
  }, [changePassword, onReset, router, token])

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

export default withUrqlClient(nextUrqlClientConfig, { ssr: false })(withAnonymous(connect(undefined, mapDispatchToProps)(ChangePassword)))
