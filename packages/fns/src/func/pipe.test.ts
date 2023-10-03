import { describe, expect, it } from 'vitest'

import { pipe } from './pipe.js'

describe('pipe', () => {
  it('should become an identity function if no functions are passed', () => {
    const piped = pipe(1)

    expect(piped).toBe(1)
  })

  it('should run the value through a pipeline of 1 function', () => {
    const piped = pipe(1, (n: number) => n + 1)

    expect(piped).toBe(2)
  })

  it('should run the value through a pipeline of 2 function', () => {
    const piped = pipe(
      1,
      (n: number) => n + 1,
      (n: number) => n * 2,
    )

    expect(piped).toBe(4)
  })

  it('should run the value through a pipeline of 3 function', () => {
    const piped = pipe(
      1,
      (n: number) => n + 1,
      (n: number) => n * 2,
      (n: number) => n - 1,
    )

    expect(piped).toBe(3)
  })

  it('should run the value through a pipeline of function with different input and output types', () => {
    const piped = pipe(
      1,
      (n) => ({ age: n }),
      (u) => `${u.age} year old`,
    )

    expect(piped).toBe('1 year old')
  })
})
