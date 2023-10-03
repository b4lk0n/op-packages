import { describe, expect, it } from 'vitest'

import { none } from './none.js'
import { some } from './some.js'
import { tryCatch, tryCatchK } from './try-catch.js'

describe('Option.tryCatch', () => {
  it('should return Some<A> if no error is thrown', () => {
    const opt = tryCatch(() => 1)

    expect(opt).toEqual(some(1))
  })

  it('should return None if an error is thrown', () => {
    const opt = tryCatch(() => {
      throw new Error('error')
    })

    expect(opt).toEqual(none())
  })
})

describe('Option.tryCatchK', () => {
  it('should return Some<A> if no error is thrown', () => {
    const safeFn = tryCatchK(() => 1)
    const opt = safeFn()

    expect(opt).toEqual(some(1))
  })

  it('should return None if an error is thrown', () => {
    const safeFn = tryCatchK(() => {
      throw new Error('error')
    })
    const opt = safeFn()

    expect(opt).toEqual(none())
  })
})
