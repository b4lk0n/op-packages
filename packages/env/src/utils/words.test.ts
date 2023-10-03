import { describe, expect, it } from 'vitest'

import { words } from './words.js'

describe('words', () => {
  it('should return an empty array when given an empty string', () => {
    expect(words('')).toEqual([])
  })

  it('should split a string into an array of words', () => {
    expect(words('hello world')).toEqual(['hello', 'world'])
    expect(words('The quick brown fox jumps over the lazy dog')).toEqual([
      'The',
      'quick',
      'brown',
      'fox',
      'jumps',
      'over',
      'the',
      'lazy',
      'dog',
    ])
  })

  it('should handle leading and trailing whitespace', () => {
    expect(words('  hello world  ')).toEqual(['hello', 'world'])
    expect(words('   The quick brown fox jumps over the lazy dog   ')).toEqual([
      'The',
      'quick',
      'brown',
      'fox',
      'jumps',
      'over',
      'the',
      'lazy',
      'dog',
    ])
  })

  it('should handle multiple spaces between words', () => {
    expect(words('hello   world')).toEqual(['hello', 'world'])
    expect(
      words('The   quick   brown   fox   jumps   over   the   lazy   dog'),
    ).toEqual([
      'The',
      'quick',
      'brown',
      'fox',
      'jumps',
      'over',
      'the',
      'lazy',
      'dog',
    ])
  })

  it('should handle non-alphanumeric characters', () => {
    expect(words('hello, world!')).toEqual(['hello', 'world'])
    expect(words('The quick brown fox jumps over the lazy dog.')).toEqual([
      'The',
      'quick',
      'brown',
      'fox',
      'jumps',
      'over',
      'the',
      'lazy',
      'dog',
    ])
  })
})
