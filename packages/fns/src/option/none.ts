import type { None, Option } from './option.js'

export const none = (): Option<never> => ({ _tag: 'Nothing' })

export const isNone = (opt: Option<unknown>): opt is None =>
  opt._tag === 'Nothing'
