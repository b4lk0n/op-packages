type FieldErrors = Record<string, string>

export class ValidationError extends Error {
  private fieldErrors: FieldErrors = {}

  constructor(message: string, fieldErrors: FieldErrors) {
    super(message)

    this.fieldErrors = fieldErrors
  }

  getFieldError(): FieldErrors {
    return this.fieldErrors
  }
}
