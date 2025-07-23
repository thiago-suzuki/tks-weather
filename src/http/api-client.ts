import ky from 'ky'

import { env } from '@/env'


export const api = {
  weather: ky.create({
    prefixUrl: `${env.NEXT_PUBLIC_API_WEATHER}`,
    retry: {
      statusCodes: [401],
    },
  }),
  geo: ky.create({
    prefixUrl: `${env.NEXT_PUBLIC_API_GEO}`,
    retry: {
      statusCodes: [401],
    },
  }),
}

export const apiDefaultParams = {
  units: "metric",
  appId: env.NEXT_PUBLIC_API_KEY
}
