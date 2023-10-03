import { err } from './err.js'
import { ok } from './ok.js'

import type { Result } from './result.js'

export const tryCatch = <E, A>(
  f: () => A,
  onThrow: (e: unknown) => E,
): Result<E, A> => {
  try {
    return ok(f())
  } catch (e: unknown) {
    return err(onThrow(e))
  }
}

export const tryCatchK =
  <A extends ReadonlyArray<unknown>, B, E>(
    f: (...a: A) => B,
    onThrow: (error: unknown) => E,
  ): ((...a: A) => Result<E, B>) =>
  (...a) =>
    tryCatch(() => f(...a), onThrow)
