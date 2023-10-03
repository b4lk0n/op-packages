import type { Ok, Result } from './result.js'

export const ok = <A, E = never>(value: A): Result<E, A> => ({
  _tag: 'Ok',
  value,
})

export const isOk = <A>(result: Result<unknown, A>): result is Ok<A> =>
  result._tag === 'Ok'
