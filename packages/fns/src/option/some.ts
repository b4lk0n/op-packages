import type { Option, Some } from './option.js'

export const some = <A>(value: A): Option<A> => ({ _tag: 'Some', value })

export const isSome = <A>(opt: Option<A>): opt is Some<A> => opt._tag === 'Some'
