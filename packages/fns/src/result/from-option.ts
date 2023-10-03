import { pipe } from '../func/index.js'
import { match } from '../option/match.js'

import { err } from './err.js'
import { ok } from './ok.js'

import type { Option } from '../option/option.js'
import type { Result } from './result.js'

export const fromOption =
  <E, A>(onNone: () => E) =>
  (opt: Option<A>): Result<E, A> =>
    pipe(
      opt,
      match(() => err(onNone()), ok),
    )
