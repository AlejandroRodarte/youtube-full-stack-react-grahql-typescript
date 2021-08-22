import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik'
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react'

// InputFieldProps is an interface that will inherit from one that is related
// to a typical HTML <input /> element. This is so we can pass to <InputField />
// properties like placeholder="" or type="" which are part of the HTML5 standard.
// However, we need to include an additional "name" property as it its required by the
// useField() hook to be passed on as an argument
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

// we destructure label and size props since useField() requires as argument
// an object that matches the GenericFieldHTMLAttributes interface and a FieldConfig
// interface that requests the "name" property
const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...rest
}: InputFieldProps) => {
  // useField returns a tuple with three objects: [FieldInputProps, FieldMetaProps, FieldHelperProps]
  const [field, { error }] = useField(rest)

  // Both generic HTML attributes and the FieldInputProps are passed to the <Input /> wrapper
  return (
    <FormControl isInvalid={ !!error }>
      <FormLabel htmlFor={ field.name }>
        { label }
      </FormLabel>
      <Input
        { ...field }
        { ...rest }
        id={ field.name }
        placeholder={ rest.placeholder }
      />
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
