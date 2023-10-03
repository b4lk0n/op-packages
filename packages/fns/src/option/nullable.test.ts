import { describe, expect, it } from 'vitest'

import { isNone } from './none.js'
import { fromNullable, toNullable, toUndefined } from './nullable.js'
import { isSome } from './some.js'

describe('Option.fromNullable', () => {
  it('should create a None value from null', () => {
    const opt = fromNullable(null)

    expect(isNone(opt)).toBe(true)
    expect(isSome(opt)).toBe(false)
  })

  it('should create a None value from undefined', () => {
    const opt = fromNullable(undefined)

    expect(isNone(opt)).toBe(true)
    expect(isSome(opt)).toBe(false)
  })

  it('should create a Some<A> value from a value', () => {
    const opt = fromNullable(1)

    expect(isSome(opt)).toBe(true)
    expect(isNone(opt)).toBe(false)
  })
})

describe('Option.toNullable', () => {
  it('should return a value for a Some<A> value', () => {
    const opt = fromNullable(1)

    expect(toNullable(opt)).toBe(1)
  })

  it('should return null for a None value', () => {
    const opt = fromNullable(null)

    expect(toNullable(opt)).toBeNull()
  })
})

describe('Option.toUndefined', () => {
  it('should return a value for a Some<A> value', () => {
    const opt = fromNullable(1)

    expect(toUndefined(opt)).toBe(1)
  })

  it('should return undefined for a None value', () => {
    const opt = fromNullable(null)

    expect(toUndefined(opt)).toBeUndefined()
  })
})
