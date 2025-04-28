export const ERROR_REQUIRED_FIELD = 'This field is required'

// EMAIL
export const REGEX_EMAIL = /^\S+@\S+\.\S+$/
export const ERROR_REGEX_EMAIL = 'Invalid email'

// PASSWORD
export const MAX_LENGTH_PASSWORD = 128
export const MIN_LENGTH_PASSWORD = 8
export const REGEX_PASSWORD = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/

export const ERROR_MAX_LENGTH_PASSWORD = `Password must be at most ${MAX_LENGTH_PASSWORD} characters`
export const ERROR_MIN_LENGTH_PASSWORD = `Password must be at least ${MIN_LENGTH_PASSWORD} characters`
export const ERROR_INVALID_PASSWORD =
  'Password must have at least one lowercase letter, one uppercase letter, and one number'
export const ERROR_SAME_OLD_PASSWORD = 'New password cannot be the same as the current password'

// CONFIRM_PASSWORD
export const ERROR_PASSWORD_NOT_MATCHED = 'Confirm password does not match'
