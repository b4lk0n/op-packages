import { err, isErr } from './err.js'
import { isOk, ok } from './ok.js'

import type { Result } from './result.js'

export const mapErr =
  <E1, A, E2>(f: (e: E1) => E2) =>
  (result: Result<E1, A>): Result<E2, A> =>
    isOk(result) ? result : err(f(result.error))

export const map =
  <E, A, B>(f: (a: A) => B) =>
  (result: Result<E, A>): Result<E, B> =>
    isErr(result) ? result : ok(f(result.value))

export const flatMap =
  <E1, A, E2, B>(f: (a: A) => Result<E2, B>) =>
  (result: Result<E1, A>): Result<E1 | E2, B> =>
    isErr(result) ? result : f(result.value)
