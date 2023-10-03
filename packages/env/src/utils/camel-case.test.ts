import { describe, expect, it } from 'vitest'

import { camelCase } from './camel-case.js'

describe('camelCase', () => {
  it('should convert a single word to camel case', () => {
    expect(camelCase('hello')).toBe('hello')
  })

  it('should convert a sentence to camel case', () => {
    expect(camelCase('hello world')).toBe('helloWorld')
  })

  it('should convert a sentence with multiple spaces to camel case', () => {
    expect(camelCase('hello   world')).toBe('helloWorld')
  })

  it('should convert a sentence with hyphens to camel case', () => {
    expect(camelCase('hello-world')).toBe('helloWorld')
  })

  it('should convert a sentence with underscores to camel case', () => {
    expect(camelCase('hello_world')).toBe('helloWorld')
  })

  it('should convert a sentence with mixed separators to camel case', () => {
    expect(camelCase('hello-world_world')).toBe('helloWorldWorld')
  })

  it('should handle empty strings', () => {
    expect(camelCase('')).toBe('')
  })
})
