import { FieldValues, UseFormSetError } from 'react-hook-form'

/**
 * Sets form errors from API response
 * @param error The error object from API response
 * @param setError The setError function from react-hook-form
 * @param fieldMapping Optional mapping of API field names to form field names
 */
export const setFormErrors = <T extends FieldValues>(
  error: any,
  setError: UseFormSetError<T>,
  fieldMapping?: Record<string, keyof T>
) => {
  if (!error || typeof error !== 'object') return

  // Handle direct field errors format: { email: ["error message"] }
  if (isDirectFieldErrors(error)) {
    Object.entries(error).forEach(([field, messages]) => {
      if (messages && Array.isArray(messages) && messages.length > 0) {
        const formField = fieldMapping?.[field] || field
        setError(formField as any, {
          type: 'server',
          message: messages[0]
        })
      }
    })
    return
  }

  // Handle nested errors format: { errors: { email: ["error message"] } }
  if (error.errors && typeof error.errors === 'object') {
    Object.entries(error.errors).forEach(([field, messages]) => {
      if (messages && Array.isArray(messages) && messages.length > 0) {
        const formField = fieldMapping?.[field] || field
        setError(formField as any, {
          type: 'server',
          message: messages[0]
        })
      }
    })
    return
  }

  // Handle string error
  if (typeof error === 'string') {
    // Set a general error if needed
    // You might want to customize this based on your form structure
    setError('root' as any, {
      type: 'server',
      message: error
    })
  }
}

/**
 * Check if the error object has direct field errors
 */
const isDirectFieldErrors = (error: any): boolean => {
  return (
    typeof error === 'object' && !('errors' in error) && Object.keys(error).some((key) => Array.isArray(error[key]))
  )
}
