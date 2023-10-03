import { describe, expect, it } from 'vitest'

import { err, ok } from '../result/index.js'

import { match } from './match.js'

describe('AsyncResult.match', () => {
  it('should return the value of an Ok<A> value', async () => {
    const res = Promise.resolve(ok(1))
    const matchValue = match(
      (e: string) => `Error: ${e}`,
      (n: number) => `It is ${n}`,
    )

    const value = await matchValue(res)

    expect(value).toBe('It is 1')
  })

  it('should return the value of an Err value', async () => {
    const res = Promise.resolve(err('Error'))
    const matchValue = match(
      (e: string) => `Error: ${e}`,
      (n: number) => `It is ${n}`,
    )

    const value = await matchValue(res)

    expect(value).toBe('Error: Error')
  })
})
