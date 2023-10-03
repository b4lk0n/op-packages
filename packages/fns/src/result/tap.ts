import { isErr } from './err.js'
import { isOk } from './ok.js'

import type { Result } from './result.js'

type Tapper<T> = (value: T) => unknown

export const tap =
  <E, T>(tapper: Tapper<T>) =>
  (result: Result<E, T>): Result<E, T> => {
    if (isOk(result)) {
      tapper(result.value)
    }

    return result
  }

export const tapErr =
  <E, T>(tapper: Tapper<E>) =>
  (result: Result<E, T>): Result<E, T> => {
    if (isErr(result)) {
      tapper(result.error)
    }

    return result
  }
