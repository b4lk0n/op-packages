import { isErr } from '../result/err.js'
import { isOk } from '../result/ok.js'

import type { AsyncResult } from './async-result.js'

export const tap =
  <E, T>(f: (value: T) => unknown) =>
  async (asyncResult: AsyncResult<E, T>) => {
    const result = await asyncResult

    if (isOk(result)) {
      f(result.value)
    }

    return asyncResult
  }

export const tapErr =
  <E, T>(f: (error: E) => unknown) =>
  async (asyncResult: AsyncResult<E, T>) => {
    const result = await asyncResult

    if (isErr(result)) {
      f(result.error)
    }

    return asyncResult
  }
