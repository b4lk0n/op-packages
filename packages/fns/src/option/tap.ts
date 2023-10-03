import { isSome } from './some.js'

import type { Option } from './option.js'

type Tapper<A> = (a: A) => unknown

export const tap =
  <A>(f: Tapper<A>) =>
  (opt: Option<A>): Option<A> => {
    if (isSome(opt)) {
      f(opt.value)
    }
    return opt
  }
