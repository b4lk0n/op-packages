import { describe, expect, it } from 'vitest'

import { match } from './match.js'
import { none } from './none.js'
import { some } from './some.js'

describe('Option.match', () => {
  it('should return the value of a Some<A> value', () => {
    const opt = some(1)
    const matchValue = match(
      () => 'default',
      (n: number) => `It is ${n}`,
    )

    expect(matchValue(opt)).toBe('It is 1')
  })

  it('should return the value of a None value', () => {
    const opt = none()
    const matchValue = match(
      () => 'default',
      (n: number) => `It is ${n}`,
    )

    expect(matchValue(opt)).toBe('default')
  })
})
