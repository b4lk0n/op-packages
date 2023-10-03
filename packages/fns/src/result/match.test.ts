import { describe, expect, it } from 'vitest'

import { err } from './err.js'
import { match } from './match.js'
import { ok } from './ok.js'

describe('Result.match', () => {
  it('should return the value of an Ok<A> value', () => {
    const res = ok(1)
    const matchValue = match(
      (e: string) => `Error: ${e}`,
      (n: number) => `It is ${n}`,
    )

    expect(matchValue(res)).toBe('It is 1')
  })

  it('should return the value of an Err value', () => {
    const res = err('Error')
    const matchValue = match(
      (e: string) => `Error: ${e}`,
      (n: number) => `It is ${n}`,
    )

    expect(matchValue(res)).toBe('Error: Error')
  })
})
