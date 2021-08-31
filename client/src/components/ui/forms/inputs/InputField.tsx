import React from 'react'
import { useField } from 'formik'
import { FormControl, FormLabel, FormErrorMessage, Input, Textarea } from '@chakra-ui/react'

import { FormTypes } from '../../../../types/forms'

interface InputFieldProps {
  fieldProps: FormTypes.FieldProps
}

const InputField: React.FC<InputFieldProps> = ({ fieldProps }: InputFieldProps) => {
  const [field, { error }] = useField(fieldProps.payload.htmlAttributes)

  let inputJsx = <div>inputJsx</div>

  switch (fieldProps.type) {
    case 'input': {
      const { size, ...rest } = fieldProps.payload.htmlAttributes

      inputJsx = (
        <Input
          { ...field }
          { ...rest }
          id={ field.name }
        />
      )

      break
    }
    case 'textarea': {
      inputJsx = (
        <Textarea
          { ...field }
          { ...fieldProps.payload.htmlAttributes }
          id={ field.name }
        />
      )

      break
    }
  }

  // Both generic HTML attributes and the FieldInputProps are passed to the <Input /> wrapper
  return (
    <FormControl isInvalid={ !!error }>
      <FormLabel htmlFor={ field.name }>
        { fieldProps.payload.label }
      </FormLabel>
      { inputJsx }
      {
        error &&
        <FormErrorMessage>
          { error }
        </FormErrorMessage>
      }
    </FormControl>
  )
}

export default InputField
