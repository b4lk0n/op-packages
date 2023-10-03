import { capitalize } from './capitalize.js'
import { words } from './words.js'

export function camelCase(str: string): string {
  return words(str)
    .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
    .join('')
}
