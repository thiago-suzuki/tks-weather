import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_WEATHER: z
      .string()
      .url(),
    NEXT_PUBLIC_API_GEO: z
      .string()
      .url(),
    NEXT_PUBLIC_API_KEY: z
      .string()
  },

  runtimeEnv: {
    NEXT_PUBLIC_API_WEATHER: process.env.NEXT_PUBLIC_API_WEATHER,
    NEXT_PUBLIC_API_GEO: process.env.NEXT_PUBLIC_API_GEO,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY
  },
})