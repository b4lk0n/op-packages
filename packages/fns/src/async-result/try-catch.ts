import { err, ok } from '../result/index.js'

import type { AsyncResult } from './async-result.js'

export const tryCatch = <E, A>(
  f: () => Promise<A>,
  onRejected: (e: unknown) => E,
): AsyncResult<E, A> =>
  f()
    .then((value) => ok(value))
    .catch((reason: unknown) => err(onRejected(reason)))

export const tryCatchK =
  <E, A extends ReadonlyArray<unknown>, B>(
    f: (...a: A) => Promise<B>,
    onRejected: (error: unknown, ...a: A) => E,
  ): ((...a: A) => AsyncResult<E, B>) =>
  (...a) =>
    tryCatch(
      () => f(...a),
      (reason: unknown) => onRejected(reason, ...a),
    )
