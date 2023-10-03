import type { Result } from '../result/index.js'
import type { AsyncResult } from './async-result.js'

export const fromResult = <E, A>(result: Result<E, A>): AsyncResult<E, A> =>
  Promise.resolve(result)
