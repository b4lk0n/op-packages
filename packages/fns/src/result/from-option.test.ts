import { describe, expect, it } from 'vitest'

import { none } from '../option/none.js'
import { some } from '../option/some.js'

import { isErr } from './err.js'
import { fromOption } from './from-option.js'
import { isOk } from './ok.js'

describe('Result.fromOption', () => {
  it('should create an Ok result from a Some value', () => {
    const createResult = fromOption(() => 'error')
    const result = createResult(some(1))

    expect(isOk(result)).toBe(true)
  })

  it('should create an Err result from a None value', () => {
    const createResult = fromOption(() => 'error')
    const result = createResult(none())

    expect(isErr(result)).toBe(true)
  })
})
