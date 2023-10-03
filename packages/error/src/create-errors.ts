import { createError } from './create-error.js'

import type { ErrorsMap } from './errors-map.js'

export function createErrors<T extends string>(errorNames: T[]): ErrorsMap<T> {
  return errorNames.reduce((errors, name) => {
    return { ...errors, [name]: createError(name) }
  }, {} as ErrorsMap<T>)
}
