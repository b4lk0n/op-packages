import { describe, expect, it } from 'vitest'

import { getOrElse, getOrElseW } from './get-or.js'
import { none } from './none.js'
import { some } from './some.js'

describe('Option.getOrElse', () => {
  it('should return the value of a Some<A> value', () => {
    const opt = some(1)
    const getValue = getOrElse(() => 2)

    expect(getValue(opt)).toBe(1)
  })

  it('should return the value of a None value', () => {
    const opt = none()
    const getValue = getOrElse(() => 2)

    expect(getValue(opt)).toBe(2)
  })
})

describe('Option.getOrElseW', () => {
  it('should return the value of a Some<A> value', () => {
    const opt = some(1)
    const getValue = getOrElseW(() => 'default')

    expect(getValue(opt)).toBe(1)
  })

  it('should return the value of a None value', () => {
    const opt = none()
    const getValue = getOrElseW(() => 'default')

    expect(getValue(opt)).toBe('default')
  })
})
