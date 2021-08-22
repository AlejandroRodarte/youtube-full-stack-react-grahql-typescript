import React from 'react'
import { Form, Formik } from 'formik'
import Wrapper from '../components/ui/wrappers/Wrapper'
import InputField from '../components/ui/forms/inputs/InputField'
import { Box, Button } from '@chakra-ui/react'
import { RegisterForm } from '../types/forms'

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const registerFormInitialValues: RegisterForm = {
    username: '',
    password: ''
  }

  return (
    <Wrapper>
      <Formik
        initialValues={ registerFormInitialValues }
        onSubmit={ (values) => console.log(values) }
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
