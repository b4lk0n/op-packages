import { describe, expect, it } from 'vitest'

import { identity } from './identity.js'

describe('identity', () => {
  it('should return the argument it receives', () => {
    expect(identity(1)).toBe(1)
  })
})
