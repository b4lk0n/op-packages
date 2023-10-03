import { describe, expect, it } from 'vitest'

import { capitalize } from './capitalize.js'

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('world')).toBe('World')
  })

  it('should return an empty string if given an empty string', () => {
    expect(capitalize('')).toBe('')
  })

  it('should return the same string if the first letter is already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello')
    expect(capitalize('World')).toBe('World')
  })

  it('should handle strings with non-letter characters at the beginning', () => {
    expect(capitalize('123hello')).toBe('123hello')
    expect(capitalize('$world')).toBe('$world')
  })

  it('should handle strings with non-letter characters at the end', () => {
    expect(capitalize('hello123')).toBe('Hello123')
    expect(capitalize('world$')).toBe('World$')
  })

  it('should handle strings with non-letter characters at both ends', () => {
    expect(capitalize('$hello123$')).toBe('$hello123$')
    expect(capitalize('!world$')).toBe('!world$')
  })
})
