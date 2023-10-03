import type { Err, Result } from './result.js'

export const err = <E, A = never>(error: E): Result<E, A> => ({
  _tag: 'Err',
  error,
})

export const isErr = <E>(result: Result<E, unknown>): result is Err<E> =>
  result._tag === 'Err'
