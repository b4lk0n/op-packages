import { AppError } from './app-error.js'

export function createError(name: string): typeof AppError {
  return class extends AppError {
    override name = name
  }
}
