import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { z } from 'zod'

import { createEnv } from './create-env.js'
import { ValidationError } from './validation-error.js'

describe('createEnv', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    originalEnv = process.env

    process.env = {
      NODE_ENV: 'development',
      'APP.PORT': '3000',
      'APP.DATABASE.URL': 'just a string',
      'GOOGLE.SERVICE_ACCOUNT_EMAIL': 'just another string',
      'MISC.VALUE.FOUR.LEVELS_DEEP': 'some value',
      'MISC.VALUE.FOUR.LEVELS_DEEPER': 'some other value',
      'MISC.VALUE.FIVE.LEVELS_DEEP': 'yet another value',
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should return the env config', () => {
    const env = createEnv(
      process.env,
      z.object({
        'APP.PORT': z.string(),
        NODE_ENV: z.literal('development'),
      }),
    )

    expect(env).toEqual({
      nodeEnv: 'development',
      app: { port: '3000' },
    })
  })

  it('should support schema transformations', () => {
    const env = createEnv(
      process.env,
      z.object({
        'APP.PORT': z.string().transform((value) => Number.parseInt(value, 10)),
        NODE_ENV: z.literal('development'),
      }),
    )

    expect(env).toEqual({
      nodeEnv: 'development',
      app: { port: 3000 },
    })
  })

  it('should throw for invalid variable type', () => {
    try {
      createEnv(
        process.env,
        z.object({
          'APP.PORT': z.number(),
        }),
      )
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        expect(e.message).toBe(
          'Validation of the following environment variables failed: "APP.PORT"',
        )
        expect(e.getFieldError()).toEqual({
          'APP.PORT':
            'The value of variable "APP.PORT" must be of type "number", but received "string"',
        })
      }
    }
  })

  it('should throw for invalid enum value', () => {
    try {
      createEnv(
        process.env,
        z.object({
          NODE_ENV: z.enum(['production', 'test']),
        }),
      )
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        expect(e.message).toBe(
          'Validation of the following environment variables failed: "NODE_ENV"',
        )
        expect(e.getFieldError()).toEqual({
          NODE_ENV:
            'Enum mismatch: The variable "NODE_ENV" must be one of the following values: "production", "test", but received "development"',
        })
      }
    }
  })

  it('should throw if variable is missing', () => {
    try {
      createEnv(
        process.env,
        z.object({
          AUTH_SERVICE_HOST: z.string(),
        }),
      )
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        expect(e.message).toBe(
          'Validation of the following environment variables failed: "AUTH_SERVICE_HOST"',
        )
        expect(e.getFieldError()).toEqual({
          AUTH_SERVICE_HOST:
            'Missing variable: The variable "AUTH_SERVICE_HOST" is required, but missing',
        })
      }
    }
  })

  it('should throw if variable value is in invalid format', () => {
    try {
      createEnv(
        process.env,
        z.object({
          'APP.DATABASE.URL': z.string().url(),
        }),
      )
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        expect(e.message).toBe(
          'Validation of the following environment variables failed: "APP.DATABASE.URL"',
        )
        expect(e.getFieldError()).toEqual({
          'APP.DATABASE.URL':
            'Format error: The value of variable "APP.DATABASE.URL" must be a valid url',
        })
      }
    }

    try {
      createEnv(
        process.env,
        z.object({
          'APP.DATABASE.URL': z.string().email(),
        }),
      )
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        expect(e.message).toBe(
          'Validation of the following environment variables failed: "APP.DATABASE.URL"',
        )
        expect(e.getFieldError()).toEqual({
          'APP.DATABASE.URL':
            'Format error: The value of variable "APP.DATABASE.URL" must be a valid email',
        })
      }
    }

    try {
      createEnv(
        process.env,
        z.object({
          'APP.DATABASE.URL': z.string().email(),
        }),
      )
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        expect(e.message).toBe(
          'Validation of the following environment variables failed: "APP.DATABASE.URL"',
        )
        expect(e.getFieldError()).toEqual({
          'APP.DATABASE.URL':
            'Format error: The value of variable "APP.DATABASE.URL" must be a valid email',
        })
      }
    }

    try {
      createEnv(
        process.env,
        z.object({
          'APP.DATABASE.URL': z.string().includes('@', { position: 1 }),
        }),
      )
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        expect(e.message).toBe(
          'Validation of the following environment variables failed: "APP.DATABASE.URL"',
        )
        expect(e.getFieldError()).toEqual({
          'APP.DATABASE.URL':
            'Format error: The value of variable "APP.DATABASE.URL" must include "@" at position 1',
        })
      }
    }
  })
})
