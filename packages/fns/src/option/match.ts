import { isNone } from './none.js'

import type { Option } from './option.js'

export const match =
  <A, B>(onNone: () => B, onSome: (a: A) => B) =>
  (opt: Option<A>) =>
    isNone(opt) ? onNone() : onSome(opt.value)
