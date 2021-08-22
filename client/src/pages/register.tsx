import React from 'react'
import { Form, Formik } from 'formik'
import Wrapper from '../components/ui/wrappers/Wrapper'
import InputField from '../components/ui/forms/inputs/InputField'
import { Box, Button } from '@chakra-ui/react'
import { RegisterForm } from '../types/forms'
import { useMutation } from 'urql'
import { MutationSymbols, mutationOperations } from '../graphql/operations/users'
import { RegisterArgsInput, RegisterUserInput } from '../types/graphql/args'

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const registerFormInitialValues: RegisterForm = {
    username: '',
    password: ''
  }

  const [, register] = useMutation(mutationOperations[MutationSymbols.REGISTER_MUTATION])

  const onSubmit = (form: RegisterForm) => {
    const registerUserInput: RegisterUserInput = form
    const registerArgsInput: RegisterArgsInput = { registerData: registerUserInput }
    return register(registerArgsInput)
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
