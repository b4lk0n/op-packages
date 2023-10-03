import { describe, expect, it, vi } from 'vitest'

import { some } from './some.js'
import { tap } from './tap.js'

describe('Option.tap', () => {
  it('should call the function with the value', () => {
    const spy = vi.fn()
    const opt = some(1)

    tap(spy)(opt)

    expect(spy).toBeCalledWith(1)
    expect(spy).toBeCalledTimes(1)
    expect(opt).toEqual(some(1))
  })
})
