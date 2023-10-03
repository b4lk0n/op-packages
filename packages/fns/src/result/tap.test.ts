import { describe, expect, it, vi } from 'vitest'

import { err } from './err.js'
import { ok } from './ok.js'
import { tap, tapErr } from './tap.js'

describe('Result.tap', () => {
  it('should call a function for an Ok value', () => {
    const result = ok(1)
    const tapper = vi.fn()

    tap(tapper)(result)

    expect(tapper).toHaveBeenCalledWith(1)
    expect(tapper).toHaveBeenCalledTimes(1)
    expect(result).toEqual(ok(1))
  })

  it('should not call a function for an Err value', () => {
    const result = err(1)
    const tapper = vi.fn()

    tap(tapper)(result)

    expect(tapper).not.toHaveBeenCalled()
    expect(result).toEqual(err(1))
  })
})

describe('Result.tapErr', () => {
  it('should call a function for an Err value', () => {
    const result = err(1)
    const tapper = vi.fn()

    tapErr(tapper)(result)

    expect(tapper).toHaveBeenCalledTimes(1)
    expect(tapper).toHaveBeenCalledWith(1)
    expect(result).toEqual(err(1))
  })

  it('should not call a function for an Ok value', () => {
    const result = ok(1)
    const tapper = vi.fn()

    tapErr(tapper)(result)

    expect(tapper).not.toHaveBeenCalled()
    expect(result).toEqual(ok(1))
  })
})
