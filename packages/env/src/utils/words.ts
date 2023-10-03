export function words(str: string): string[] {
  return str.split(/[^a-zA-Z0-9]+|(?<!^)(?=[A-Z][a-z])/g).filter(Boolean)
}
