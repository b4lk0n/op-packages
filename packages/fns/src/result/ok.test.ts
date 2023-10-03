import { describe, expect, it } from 'vitest'

import { isOk, ok } from './ok.js'

describe('Result.ok', () => {
  it('should create an Ok result', () => {
    const result = ok(1)

    expect(isOk(result)).toBe(true)
  })
})
