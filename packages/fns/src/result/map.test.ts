import { describe, expect, it } from 'vitest'

import { err } from './err.js'
import { flatMap, map, mapErr } from './map.js'
import { ok } from './ok.js'

describe('Result.map', () => {
  it('should map over an Ok<A> value', () => {
    const resultA = ok(1)
    const plus1 = map((n: number) => n + 1)
    const resultB = plus1(resultA)

    expect(resultB).toEqual(ok(2))
  })

  it('should leave an Err<E> value unchanged', () => {
    const resultA = err(1)
    const plus1 = map((n: number) => n + 1)
    const resultB = plus1(resultA)

    expect(resultB).toEqual(resultA)
  })
})

describe('Result.mapErr', () => {
  it('should map over an Err<E> value', () => {
    const resultA = err(1)
    const plus1 = mapErr((n: number) => n + 1)
    const resultB = plus1(resultA)

    expect(resultB).toEqual(err(2))
  })

  it('should leave an Ok<A> value unchanged', () => {
    const resultA = ok(1)
    const plus1 = mapErr((n: number) => n + 1)
    const resultB = plus1(resultA)

    expect(resultB).toEqual(resultA)
  })
})

describe('Result.flatMap', () => {
  it('should map over an Ok<A> value', () => {
    const resultA = ok(1)
    const plus1 = flatMap((n: number) => ok(n + 1))
    const resultB = plus1(resultA)

    expect(resultB).toEqual(ok(2))
  })

  it('should leave an Err<E> value unchanged', () => {
    const resultA = err(1)
    const plus1 = flatMap((n: number) => ok(n + 1))
    const resultB = plus1(resultA)

    expect(resultB).toEqual(resultA)
  })
})
