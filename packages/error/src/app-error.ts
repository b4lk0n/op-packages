export class AppError extends Error {
  override cause?: AppError
  data?: object

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

  static create(message: string, cause?: unknown): AppError {
    return new AppError(message, cause)
  }

  private static trimErrorMessage(message: string) {
    return message.trim().replaceAll(/\s+/g, ' ')
  }

  constructor(message: string, cause?: unknown) {
    super(message)

    this.name = 'AppError'

    if (cause) {
      this.wrap(cause)
    }
  }

  setData(data: object): AppError {
    this.data = data

    return this
  }

  flatten(): AppError[] {
    const causes = this.cause?.flatten() ?? []

    return [this, ...causes]
  }

  wrap(cause: unknown): AppError {
    this.cause = AppError.from(cause)

    return this
  }

  unwrap(): string {
    const getErrorMessage = (error: AppError) => error.message

    return this.flatten().map(getErrorMessage).join(': ')
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      data: this.data,
      stack: this.stack,
      unwrapped: this.unwrap(),
      cause: this.cause,
    }
  }
}
