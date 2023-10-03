import { camelCase } from './utils/camel-case.js'

import type { Group } from './group.js'

export function groupVariables<
  TInput extends object,
  TOutput = Group<TInput, '.'>,
>(input: TInput, groupBy = '.'): TOutput {
  const output = {} as TOutput

  for (const [key, value] of Object.entries(input)) {
    const parts = key.split(groupBy)
    const partsCount = parts.length
    let target = output

    for (let i = 0; i < partsCount; i++) {
      const part = camelCase(parts[i] as string) as keyof TOutput

      if (i === partsCount - 1) {
        target[part] = value
      } else {
        // @ts-expect-error - need to assign {} to target[part] to iterate further
        target[part] = target[part] || {}
        // @ts-expect-error - need to override target to iterate further
        target = target[part]
      }
    }
  }

  return output
}
