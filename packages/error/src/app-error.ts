export class AppError extends Error {
  override cause?: AppError

  static fromError(error: Error): AppError {
    const cause =
      error?.cause instanceof Error
        ? new AppError(AppError.trimErrorMessage(error.cause.message))
        : undefined

    return new AppError(AppError.trimErrorMessage(error.message), cause)
  }

  static from(error: unknown): AppError {
    if (error instanceof AppError) {
      return error
    }

    if (error instanceof Error) {
      return AppError.fromError(error)
    }

    if (typeof error === 'string') {
      return new AppError(error)
    }

    return new AppError(JSON.stringify(error))
  }

  static create(message: string, cause?: AppError): AppError {
    return new AppError(message, cause)
  }

  private static trimErrorMessage(message: string) {
    return message.trim().replaceAll(/\s+/g, ' ')
  }

  constructor(message: string, cause?: AppError) {
    super(message)

    this.name = 'AppError'

    if (cause) {
      this.wrap(cause)
    }
  }

  get flattened(): AppError[] {
    const causes = this.cause?.flattened ?? []

    return [this, ...causes]
  }

  wrap(cause: AppError): void {
    this.cause = cause
  }

  get unwrapped(): string {
    const getErrorMessage = (error: AppError) => error.message

    return this.flattened.map(getErrorMessage).join(': ')
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      unwrapped: this.unwrapped,
      cause: this.cause,
    }
  }
}
