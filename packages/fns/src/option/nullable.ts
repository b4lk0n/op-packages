import { getOrElseW } from './get-or.js'
import { none } from './none.js'
import { some } from './some.js'

import type { Option } from './option.js'

export const fromNullable = <A>(value: A | null | undefined): Option<A> =>
  value === null || typeof value === 'undefined' ? none() : some(value)

export const toNullable = <A>(opt: Option<A>): A | null =>
  getOrElseW<A, null>(() => null)(opt)

export const toUndefined = <A>(opt: Option<A>): A | undefined =>
  getOrElseW<A, undefined>(() => undefined)(opt)
