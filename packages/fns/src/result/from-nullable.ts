import { err } from './err.js'
import { ok } from './ok.js'

import type { Result } from './result.js'

export const fromNullable =
  <E, A>(error: E) =>
  (value: A | null | undefined): Result<E, A> =>
    value == null || typeof value === 'undefined' ? err(error) : ok(value)
