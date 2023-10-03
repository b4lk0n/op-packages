import { describe, expect, it } from 'vitest'

import { isNone, none } from './none.js'

describe('Option.none', () => {
  it('should create a None value', () => {
    const opt = none()

    expect(isNone(opt)).toBe(true)
  })
})
