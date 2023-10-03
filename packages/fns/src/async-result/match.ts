import { isErr } from '../result/err.js'

import type { AsyncResult } from './async-result.js'

export const match =
  <E, A, B>(onErr: (e: E) => B, onOk: (a: A) => B) =>
  async (asyncResult: AsyncResult<E, A>) => {
    const result = await asyncResult

    return isErr(result) ? onErr(result.error) : onOk(result.value)
  }
