import { describe, expect, it } from 'vitest'

import { err, isErr, isOk, ok } from '../result/index.js'

import { tryCatch, tryCatchK } from './try-catch.js'

describe('AsyncResult.tryCatch', () => {
  it('should return Ok<A> if a promise does not reject', async () => {
    const asyncResult = tryCatch(
      () => Promise.resolve(1),
      () => 'error',
    )

    const result = await asyncResult

    expect(asyncResult).toBeInstanceOf(Promise)
    expect(isOk(result)).toBe(true)
  })

  it('should return Err<E> if a promise rejects', async () => {
    const asyncResult = tryCatch(
      () => Promise.reject('oops'),
      () => `error`,
    )

    const result = await asyncResult

    expect(asyncResult).toBeInstanceOf(Promise)
    expect(isErr(result)).toBe(true)
  })
})

describe('AsyncResult.tryCatchK', () => {
  it('should return Ok<A> if a promise does not reject', async () => {
    const safeFn = tryCatchK(
      (n: number) => Promise.resolve(n),
      () => 'error',
    )
    const result = await safeFn(5)

    expect(isOk(result)).toBe(true)
    expect(result).toEqual(ok(5))
  })

  it('should return Err<E> if a promise rejects', async () => {
    const safeFn = tryCatchK(
      (name: string) => Promise.reject(name),
      () => `error`,
    )

    const result = await safeFn('john')

    expect(isErr(result)).toBe(true)
    expect(result).toEqual(err('error'))
  })
})
