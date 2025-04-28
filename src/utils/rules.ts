import * as yup from 'yup'
import {
  ERROR_INVALID_PASSWORD,
  ERROR_MAX_LENGTH_PASSWORD,
  ERROR_MIN_LENGTH_PASSWORD,
  ERROR_PASSWORD_NOT_MATCHED,
  ERROR_REGEX_EMAIL,
  ERROR_REQUIRED_FIELD,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
  REGEX_EMAIL,
  REGEX_PASSWORD
} from '../constants/validate'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required(ERROR_REQUIRED_FIELD)
    .min(MIN_LENGTH_PASSWORD, ERROR_MIN_LENGTH_PASSWORD)
    .max(MAX_LENGTH_PASSWORD, ERROR_MAX_LENGTH_PASSWORD)
    .oneOf([yup.ref(refString)], ERROR_PASSWORD_NOT_MATCHED)
}

export const authSchema = yup.object({
  email: yup.string().required(ERROR_REQUIRED_FIELD).matches(REGEX_EMAIL, ERROR_REGEX_EMAIL),
  password: yup
    .string()
    .required(ERROR_REQUIRED_FIELD)
    .min(MIN_LENGTH_PASSWORD, ERROR_MIN_LENGTH_PASSWORD)
    .max(MAX_LENGTH_PASSWORD, ERROR_MAX_LENGTH_PASSWORD)
    .matches(REGEX_PASSWORD, ERROR_INVALID_PASSWORD),
  confirm_password: handleConfirmPasswordYup('password'),
  first_name: yup.string().trim().min(1, ERROR_REQUIRED_FIELD).required(ERROR_REQUIRED_FIELD),
  last_name: yup.string().trim().min(1, ERROR_REQUIRED_FIELD).required(ERROR_REQUIRED_FIELD)
})

export type AuthSchemaType = yup.InferType<typeof authSchema>
