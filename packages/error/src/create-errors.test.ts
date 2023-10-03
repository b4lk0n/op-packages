import { describe, expect, it } from 'vitest'

import { AppError } from './app-error.js'
import { createErrors } from './create-errors.js'

describe('createErrors', () => {
  it('should create errors by passing an array of names', () => {
    const { CustomError } = createErrors(['CustomError'])

    const error = new CustomError('message')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(CustomError)
    expect(error).toHaveProperty('name', 'CustomError')
  })

  it('should create an error with overloaded constructor', () => {
    const { CustomError } = createErrors(['CustomError'])

    const err1 = new CustomError('err1')
    const err2 = new CustomError('err2', err1)
    expect(err2.unwrapped).toBe('err2: err1')
  })

  it('should unwrap messages', () => {
    const { FirstError, SecondError, ThirdError } = createErrors([
      'FirstError',
      'SecondError',
      'ThirdError',
    ])

    const err1 = new FirstError('first message')
    const err2 = new SecondError('second message', err1)
    const err3 = new ThirdError('third message', err2)

    expect(err3.unwrapped).toBe('third message: second message: first message')
  })
})
