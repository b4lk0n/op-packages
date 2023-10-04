import { describe, expect, it } from 'vitest'

import { AppError } from './app-error.js'

describe('AppError', () => {
  it('should create instance of AppError', () => {
    const error = new AppError('oops')

    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('AppError')
    expect(error.message).toBe('oops')
    expect(error.cause).toBeUndefined()
    expect(error.unwrap()).toBe('oops')
  })

  it('should create instance of AppError with cause', () => {
    const error = new AppError('oops', new AppError('cause'))

    expect(error.message).toBe('oops')
    expect(error.cause).toBeInstanceOf(AppError)
    expect(error.cause).toBeInstanceOf(Error)
    expect(error.unwrap()).toBe('oops: cause')
  })

  it('should create instance of AppError with nested cause', () => {
    const error = new AppError(
      'oops',
      new AppError('cause', new AppError('nested cause')),
    )

    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('oops')
    expect(error.cause).toBeInstanceOf(AppError)
    expect(error.cause).toBeInstanceOf(Error)
    expect(error.cause?.cause).toBeInstanceOf(AppError)
    expect(error.cause?.cause).toBeInstanceOf(Error)
    expect(error.unwrap()).toBe('oops: cause: nested cause')
  })

  it('should create instance of AppError and wrap a cause', () => {
    const error = new AppError('oops')
    const cause = new AppError('cause')

    error.wrap(cause)

    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('oops')
    expect(error.cause).toBeInstanceOf(AppError)
    expect(error.cause).toBeInstanceOf(Error)
    expect(error.unwrap()).toBe('oops: cause')
  })

  it('should create instance of AppError from native Error', () => {
    const nativeError = new Error('oops')
    const error = AppError.fromError(nativeError)

    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('oops')
  })

  it('should create instance of AppError from native Error with cause', () => {
    const nativeError = new Error('oops', {
      cause: new Error('cause'),
    })
    const error = AppError.fromError(nativeError)

    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('oops')
  })

  it('should serialize to JSON', () => {
    const cause = new Error('cause')
    const nativeError = new Error('oops', {
      cause,
    })
    const error = AppError.fromError(nativeError)

    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('oops')

    const restored = JSON.parse(JSON.stringify(error))

    expect(restored).toEqual({
      name: 'AppError',
      message: 'oops',
      stack: error.stack,
      unwrapped: 'oops: cause',
      cause: {
        name: 'AppError',
        message: 'cause',
        stack: error.cause?.stack,
        unwrapped: 'cause',
        cause: undefined,
      },
    })
  })

  it('should create instance of AppError with data', () => {
    const error = new AppError('oops').setData({ foo: 'bar' })

    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('oops')
    expect(error.data).toEqual({ foo: 'bar' })
  })

  it('should create instance of AppError with data and cause', () => {
    const cause = new Error('cause')
    const error = new AppError('oops', cause).setData({ foo: 'bar' })

    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('oops')
    expect(error.data).toEqual({ foo: 'bar' })
    expect(error.cause).toBeInstanceOf(AppError)
    expect(error.cause).toBeInstanceOf(Error)
    expect(error.unwrap()).toBe('oops: cause')
  })

  it('should create an AppError with an unknown cause', () => {
    const cause: unknown = new Error('cause')
    const error = new AppError('oops', cause)

    expect(error).toBeInstanceOf(AppError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('oops')
    expect(error.cause).toBeInstanceOf(AppError)
    expect(error.unwrap()).toBe('oops: cause')
  })
})
