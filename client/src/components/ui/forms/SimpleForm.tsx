import React from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import InputField from './inputs/InputField'
import { Button } from '@chakra-ui/react'

import { FormTypes } from '../../../types/forms'

interface SimpleFormProps<T> {
  initialValues: T
  fieldsConfig: FormTypes.FormFieldsConfig<T>
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => Promise<void>
  submitButtonText: string
}

const SimpleForm = <T, >({
  initialValues,
  fieldsConfig,
  onSubmit,
  submitButtonText
}: SimpleFormProps<T>) => {
  return (
    <Formik
      initialValues={ initialValues }
      onSubmit={ onSubmit }
    >
      {
        ({ isSubmitting }) => (
          <Form>
            {
              Object.keys(fieldsConfig).map((field) => {
                const typedField = field as keyof T

                return (
                  <InputField
                    key={ field }
                    fieldProps={ fieldsConfig[typedField] }
                  />
                )
              })
            }
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

export default SimpleForm
