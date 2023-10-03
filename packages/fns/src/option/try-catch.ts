import { none } from './none.js'
import { some } from './some.js'

import type { Option } from './option.js'

export const tryCatch = <A>(f: () => A): Option<A> => {
  try {
    return some(f())
  } catch {
    return none()
  }
}

export const tryCatchK =
  <A extends ReadonlyArray<unknown>, B>(
    f: (...a: A) => B,
  ): ((...a: A) => Option<B>) =>
  (...a) =>
    tryCatch(() => f(...a))
