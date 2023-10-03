import { isErr } from './err.js'

import type { Result } from './result.js'

export const match =
  <E, A, B>(onErr: (e: E) => B, onOk: (a: A) => B) =>
  (res: Result<E, A>) =>
    isErr(res) ? onErr(res.error) : onOk(res.value)
