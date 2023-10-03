import { describe, expect, it } from 'vitest'

import { AppError } from './app-error.js'
import { createError } from './create-error.js'

describe('createError', () => {
  it('should create an error which inherits AppError', () => {
    const CustomError = createError('CustomError')
    const error = new CustomError('oops')

    expect(error).toBeInstanceOf(CustomError)
    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('oops')
    expect(error.unwrapped).toBe('oops')
    expect(error.name).toBe('CustomError')
  })
})
