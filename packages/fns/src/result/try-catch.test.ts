import { describe, expect, it } from 'vitest'

import { err } from './err.js'
import { ok } from './ok.js'
import { tryCatch, tryCatchK } from './try-catch.js'

describe('Result.tryCatch', () => {
  it('should return Ok<A> if no error is thrown', () => {
    const result = tryCatch(
      () => 1,
      () => 'error',
    )

    expect(result).toEqual(ok(1))
  })

  it('should return Err<E> if an error is thrown', () => {
    const result = tryCatch(
      () => {
        throw new Error('error')
      },
      () => 'error',
    )

    expect(result).toEqual(err('error'))
  })
})

describe('Result.tryCatchK', () => {
  it('should return Ok<A> if no error is thrown', () => {
    const safeFn = tryCatchK(
      () => 1,
      () => 'error',
    )
    const res = safeFn()

    expect(res).toEqual(ok(1))
  })

  it('should return Err<E> if an error is thrown', () => {
    const safeFn = tryCatchK(
      () => {
        throw new Error('error')
      },
      () => 'error',
    )
    const res = safeFn()

    expect(res).toEqual(err('error'))
  })
})
