import { describe, expect, it } from 'vitest'

import { err } from './err.js'
import { fromNullable } from './from-nullable.js'
import { ok } from './ok.js'

describe('Result.fromNullable', () => {
  it('should create an Ok result from a non-null value', () => {
    const result = fromNullable('error')(1)

    expect(result).toEqual(ok(1))
  })

  it('should create an Err result from a null value', () => {
    const result = fromNullable('error')(null)

    expect(result).toEqual(err('error'))
  })

  it('should create an Err result from an undefined value', () => {
    const result = fromNullable('error')(undefined)

    expect(result).toEqual(err('error'))
  })
})
