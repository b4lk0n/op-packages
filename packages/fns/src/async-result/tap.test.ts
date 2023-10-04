import { describe, expect, it, vi } from 'vitest'

import { err } from '../result/err.js'
import { ok } from '../result/ok.js'

import { tap, tapErr } from './tap.js'

describe('AsyncResult.tap', () => {
  it('should call a function for an Ok value', async () => {
    const asyncResult = Promise.resolve(ok(1))
    const tapper = vi.fn()

    const asyncResult2 = tap(tapper)(asyncResult)
    const result2 = await asyncResult2

    expect(tapper).toHaveBeenCalledWith(1)
    expect(tapper).toHaveBeenCalledTimes(1)
    expect(result2).toEqual(ok(1))
  })

  it('should not call a function for an Err value', async () => {
    const asyncResult = Promise.resolve(err(1))
    const tapper = vi.fn()

    const asyncResult2 = tap(tapper)(asyncResult)
    const result2 = await asyncResult2

    expect(tapper).not.toHaveBeenCalled()
    expect(result2).toEqual(err(1))
  })
})

describe('AsyncResult.tapErr', () => {
  it('should call a function for an Err value', async () => {
    const asyncResult = Promise.resolve(err(1))
    const tapper = vi.fn()

    const asyncResult2 = tapErr(tapper)(asyncResult)
    const result2 = await asyncResult2

    expect(tapper).toHaveBeenCalledTimes(1)
    expect(tapper).toHaveBeenCalledWith(1)
    expect(result2).toEqual(err(1))
  })

  it('should not call a function for an Ok value', async () => {
    const asyncResult = Promise.resolve(ok(1))
    const tapper = vi.fn()

    const asyncResult2 = tapErr(tapper)(asyncResult)
    const result2 = await asyncResult2

    expect(tapper).not.toHaveBeenCalled()
    expect(result2).toEqual(ok(1))
  })
})
