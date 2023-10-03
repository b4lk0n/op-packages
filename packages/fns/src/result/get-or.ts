import { isErr } from './err.js'

import type { Result } from './result.js'

export const getOrElse =
  <E, A>(onErr: (err: E) => A) =>
  (result: Result<E, A>): A =>
    isErr(result) ? onErr(result.error) : result.value

export const getOrElseW =
  <E, A, B>(onErr: (err: E) => B) =>
  (result: Result<E, A>): A | B =>
    isErr(result) ? onErr(result.error) : result.value
