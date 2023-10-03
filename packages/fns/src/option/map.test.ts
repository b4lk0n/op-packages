import { describe, expect, it } from 'vitest'

import { getOrElse } from './get-or.js'
import { map } from './map.js'
import { isNone, none } from './none.js'
import { some } from './some.js'

describe('Option.map', () => {
  it('should map over a Some<A> value', () => {
    const optA = some(1)
    const plus1 = map((n: number) => n + 1)
    const optB = plus1(optA)
    const getValue = getOrElse(() => 3)

    expect(getValue(optB)).toBe(2)
  })

  it('should leave a None value unchanged', () => {
    const optA = none()
    const plus1 = map((n: number) => n + 1)
    const optB = plus1(optA)

    expect(isNone(optB)).toBe(true)
  })
})
