import React from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import Wrapper from '../components/ui/wrappers/Wrapper'
import InputField from '../components/ui/forms/inputs/InputField'
import { Box, Button } from '@chakra-ui/react'
import { RegisterForm } from '../types/forms'
import { RegisterArgsInput, RegisterUserInput, RegisterArgsErrors } from '../types/graphql/args/users'
import { useRegisterMutation } from '../generated/graphql'
import mapFieldErrors from '../util/functions/map-field-errors'
import unflatten from '../util/functions/unflatten-object'
import { useRouter } from 'next/router'

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const registerFormInitialValues: RegisterForm = {
    username: '',
    password: ''
  }

  const router = useRouter()
  const [, register] = useRegisterMutation()

  const onSubmit = async (
    form: RegisterForm,
    { setErrors }: FormikHelpers<RegisterForm>
  ) => {
    const registerUserInput: RegisterUserInput = form
    const registerArgsInput: RegisterArgsInput = { registerData: registerUserInput }

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
  }

  return (
    <Wrapper>
      <Formik
        initialValues={ registerFormInitialValues }
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
                Register
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  )
}

export default Register
