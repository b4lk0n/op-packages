import { groupVariables } from './group-variables.js'
import { ValidationError } from './validation-error.js'

import type { z } from 'zod'
import type { Group } from './group.js'

export function createEnv<
  TInput,
  TOutput extends object,
  TGroupedOutput = Group<TOutput>,
>(
  processEnv: NodeJS.ProcessEnv | Record<string, unknown>,
  schema: z.ZodType<TOutput, z.ZodTypeDef, TInput>,
): TGroupedOutput {
  const result = schema.safeParse(processEnv)

  if (result.success) {
    const data = result.data

    return groupVariables(data, '.')
  }

  const { errors } = result.error

  const affectedVariables: string[] = []

  const fieldErrors: Record<string, string> = {}

  errors.forEach((error) => {
    const fieldName = error.path[0] as string

    affectedVariables.push(fieldName)

    let errorMessage = `Unknown error for variable "${fieldName}"`

    switch (error.code) {
      case 'invalid_type':
        if (error.received === 'undefined') {
          errorMessage = `Missing variable: The variable "${fieldName}" is required, but missing`
          break
        }

        errorMessage = `The value of variable "${fieldName}" must be of type "${error.expected}", but received "${error.received}"`
        break

      case 'invalid_enum_value':
        errorMessage = `Enum mismatch: The variable "${fieldName}" must be one of the following values: "${error.options.join(
          '", "',
        )}", but received "${error.received}"`
        break

      case 'invalid_string':
        if ('string' === typeof error.validation) {
          errorMessage = `Format error: The value of variable "${fieldName}" must be a valid ${error.validation}`
        } else if ('startsWith' in error.validation) {
          errorMessage = `Format error: The value of variable "${fieldName}" must start with ${error.validation.startsWith}`
        } else if ('endsWith' in error.validation) {
          errorMessage = `Format error: The value of variable "${fieldName}" must end with ${error.validation.endsWith}`
        } else {
          errorMessage = `Format error: The value of variable "${fieldName}" must include "${
            error.validation.includes
          }"${
            error.validation.position
              ? ` at position ${error.validation.position}`
              : ''
          }`
        }
        break
    }

    fieldErrors[fieldName] = errorMessage
  })

  const errorMessage = `Validation of the following environment variables failed: "${affectedVariables.join(
    '", "',
  )}"`

  throw new ValidationError(errorMessage, fieldErrors)
}
