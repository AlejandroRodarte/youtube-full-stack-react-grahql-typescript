import React from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import InputField from './inputs/InputField'
import { Button } from '@chakra-ui/react'
import { FormFieldsConfig } from '../../../types/forms'

interface SimpleFormProps<T> {
  initialValues: T,
  fieldsConfig: FormFieldsConfig<T>,
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
                    name={ fieldsConfig[typedField].name }
                    placeholder={ fieldsConfig[typedField].placeholder }
                    label={ fieldsConfig[typedField].label }
                    type={ fieldsConfig[typedField].type }
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
