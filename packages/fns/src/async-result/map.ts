import { err, isErr, isOk, ok } from '../result/index.js'

import type { AsyncResult } from './async-result.js'

export const mapErr =
  <E1, A, E2>(f: (e: E1) => E2) =>
  async (asyncResult: AsyncResult<E1, A>): AsyncResult<E2, A> => {
    const result = await asyncResult
    return isOk(result) ? result : err(f(result.error))
  }

export const map =
  <E, A, B>(f: (a: A) => B) =>
  async (asyncResult: AsyncResult<E, A>): AsyncResult<E, B> => {
    const result = await asyncResult

    return isErr(result) ? result : ok(f(result.value))
  }

export const flatMap =
  <E1, A, E2, B>(f: (a: A) => AsyncResult<E2, B>) =>
  async (asyncResult: AsyncResult<E1, A>): AsyncResult<E1 | E2, B> => {
    const result = await asyncResult

    return isErr(result) ? result : f(result.value)
  }
