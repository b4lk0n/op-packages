import { describe, expect, it } from 'vitest'

import { groupVariables } from './group-variables.js'

describe('groupVariables', () => {
  it('should group variables', () => {
    const result = groupVariables({
      'PLATFORM.NODE_ENV': 'dev',
      'PLATFORM.PORT': 3000,
      'APP.SERVICE_ACCOUNT_EMAIL': 'some@email.com',
      'MISC.VALUE.FOUR.LEVELS_DEEP': 'some value',
      'MISC.VALUE.FOUR.LEVELS_DEEPER': 'some other value',
      'MISC.VALUE.FIVE.LEVELS_DEEP': 'yet another value',
    })

    expect(result).toEqual({
      platform: {
        nodeEnv: 'dev',
        port: 3000,
      },
      app: {
        serviceAccountEmail: 'some@email.com',
      },
      misc: {
        value: {
          four: {
            levelsDeep: 'some value',
            levelsDeeper: 'some other value',
          },
          five: {
            levelsDeep: 'yet another value',
          },
        },
      },
    })
  })

  it('should handle empty input', () => {
    const result = groupVariables({})
    expect(result).toEqual({})
  })

  it('should handle input with only one variable', () => {
    const result = groupVariables({ 'PLATFORM.NODE_ENV': 'dev' })
    expect(result).toEqual({
      platform: {
        nodeEnv: 'dev',
      },
    })
  })

  it('should handle input with variables at the same level', () => {
    const result = groupVariables({
      'PLATFORM.NODE_ENV': 'dev',
      'APP.NODE_ENV': 'prod',
    })
    expect(result).toEqual({
      platform: {
        nodeEnv: 'dev',
      },
      app: {
        nodeEnv: 'prod',
      },
    })
  })

  it('should handle input with variables at different levels', () => {
    const result = groupVariables({
      'PLATFORM.NODE_ENV': 'dev',
      'APP.SERVICE_ACCOUNT_EMAIL': 'some@email.com',
      'MISC.VALUE.FOUR.LEVELS_DEEP': 'some value',
    })
    expect(result).toEqual({
      platform: {
        nodeEnv: 'dev',
      },
      app: {
        serviceAccountEmail: 'some@email.com',
      },
      misc: {
        value: {
          four: {
            levelsDeep: 'some value',
          },
        },
      },
    })
  })
})
