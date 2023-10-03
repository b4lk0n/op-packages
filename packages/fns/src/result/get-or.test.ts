import { describe, expect, it } from 'vitest'

import { err } from './err.js'
import { getOrElse, getOrElseW } from './get-or.js'
import { ok } from './ok.js'

describe('Option.getOrElse', () => {
  it('should return the value of an Ok<A> result', () => {
    const result = ok(1)
    const getValue = getOrElse(() => 2)

    expect(getValue(result)).toBe(1)
  })

  it('should return the value of an Err<E> result', () => {
    const result = err(1)
    const getValue = getOrElse(() => 2)

    expect(getValue(result)).toBe(2)
  })
})

describe('Option.getOrElseW', () => {
  it('should return the value of an Ok<A> result', () => {
    const result = ok(1)
    const getValue = getOrElseW(() => 'default')

    expect(getValue(result)).toBe(1)
  })

  it('should return the value of an Err<E> result', () => {
    const result = err(1)
    const getValue = getOrElseW(() => 'default')

    expect(getValue(result)).toBe('default')
  })
})
