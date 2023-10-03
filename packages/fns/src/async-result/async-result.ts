import type { Async } from '../async/index.js'
import type { Result } from '../result/index.js'

export type AsyncResult<E, A> = Async<Result<E, A>>
