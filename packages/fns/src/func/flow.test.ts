import { describe, expect, it } from 'vitest'

import { flow } from './flow.js'

describe('flow', () => {
  it('should create a composition of 1 function', () => {
    const inc = flow((n: number) => n + 1)

    expect(inc(1)).toBe(2)
  })

  it('should create a composition of 2 functions', () => {
    const inc = flow(
      (n: number) => n + 1,
      (n: number) => n * 2,
    )

    expect(inc(1)).toBe(4)
  })

  it('should create a composition of 3 functions', () => {
    const inc = flow(
      (n: number) => n + 1,
      (n: number) => n * 2,
      (n: number) => n - 1,
    )

    expect(inc(1)).toBe(3)
  })

  it('should create a composition of functions with different input and output types', () => {
    const inc = flow(
      (n: number) => ({ age: n }),
      (u) => `${u.age} year old`,
    )

    expect(inc(1)).toBe('1 year old')
  })
})
