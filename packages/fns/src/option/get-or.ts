import { isNone } from './none.js'

import type { Option } from './option.js'

export const getOrElse =
  <A>(onNone: () => A) =>
  (opt: Option<A>): A =>
    isNone(opt) ? onNone() : opt.value

export const getOrElseW =
  <A, B>(onNone: () => B) =>
  (opt: Option<A>): B | A =>
    isNone(opt) ? onNone() : opt.value
