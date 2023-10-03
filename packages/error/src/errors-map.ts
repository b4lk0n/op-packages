import type { AppError } from './app-error.js'

export type ErrorsMap<T extends string> = {
  [K in T]: typeof AppError
}
