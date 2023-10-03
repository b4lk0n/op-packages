import { describe, expect, it } from 'vitest'

import { err, ok } from '../result/index.js'

import { flatMap, map, mapErr } from './map.js'

describe('AsyncResult.map', () => {
  it('should map over an Ok<A> value', async () => {
    const asyncResult = Promise.resolve(ok(1))
    const plus1 = map((n: number) => n + 1)
    const result = await plus1(asyncResult)

    expect(result).toEqual(ok(2))
  })

  it('should leave an Err<E> value unchanged', async () => {
    const asyncResult = Promise.resolve(err(1))
    const plus1 = map((n: number) => n + 1)
    const result = await plus1(asyncResult)

    expect(result).toEqual(err(1))
  })
})

describe('AsyncResult.mapErr', () => {
  it('should map over an Err<E> value', async () => {
    const asyncResult = Promise.resolve(err(1))
    const plus1 = mapErr((n: number) => n + 1)
    const result = await plus1(asyncResult)

    expect(result).toEqual(err(2))
  })

  it('should leave an Ok<A> value unchanged', async () => {
    const asyncResult = Promise.resolve(ok(1))
    const plus1 = mapErr((n: number) => n + 1)
    const result = await plus1(asyncResult)

    expect(result).toEqual(ok(1))
  })
})

describe('AsyncResult.flatMap', () => {
  it('should map over an Ok<A> value', async () => {
    const asyncResult = Promise.resolve(ok(1))
    const plus1 = flatMap((n: number) => Promise.resolve(ok(n + 1)))
    const result = await plus1(asyncResult)

    expect(result).toEqual(ok(2))
  })

  it('should leave an Err<E> value unchanged', async () => {
    const asyncResult = Promise.resolve(err(1))
    const plus1 = flatMap((n: number) => Promise.resolve(ok(n + 1)))
    const result = await plus1(asyncResult)

    expect(result).toEqual(err(1))
  })
})
