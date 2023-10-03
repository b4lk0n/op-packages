import { describe, expect, it } from 'vitest'

import { isSome, some } from './some.js'

describe('Option.some', () => {
  it('should create a Some<A> value', () => {
    const opt = some(1)

    expect(isSome(opt)).toBe(true)
  })
})
