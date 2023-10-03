import { describe, expect, it } from 'vitest'

import { err, isErr } from './err.js'

describe('Result.err', () => {
  it('should create an Err result', () => {
    const result = err('error')

    expect(isErr(result)).toBe(true)
  })
})
