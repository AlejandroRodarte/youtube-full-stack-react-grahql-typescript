import React from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import InputField from '../inputs/InputField'
import { Box, Button } from '@chakra-ui/react'
import { CredentialsForm as CredentialsFormInterface } from './../../../../types/forms'

interface CredentialsFormProps {
  initialValues: CredentialsFormInterface
  onSubmit: (values: CredentialsFormInterface, formikHelpers: FormikHelpers<CredentialsFormInterface>) => Promise<void>
  submitButtonText: string
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  initialValues,
  onSubmit,
  submitButtonText
}: CredentialsFormProps) => {
  return (
    <Formik
      initialValues={ initialValues }
      onSubmit={ onSubmit }
    >
      {
        ({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={ 4 }>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              colorScheme="teal"
              mt={ 4 }
              isLoading={ isSubmitting }
            >
              { submitButtonText }
            </Button>
          </Form>
        )
      }
    </Formik>
  )
}

export default CredentialsForm
