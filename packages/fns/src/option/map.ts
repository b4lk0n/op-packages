import { isNone, none } from './none.js'
import { some } from './some.js'

import type { Option } from './option.js'

type Mapper<A, B> = (a: A) => B

export const map =
  <A, B>(f: Mapper<A, B>) =>
  (opt: Option<A>): Option<B> =>
    isNone(opt) ? none() : some(f(opt.value))
