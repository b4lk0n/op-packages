import { ValidationError } from './validation-error.js'

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError
}
