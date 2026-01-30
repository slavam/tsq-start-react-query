import { queryOptions } from '@tanstack/react-query'
// import { createServerFn } from '@tanstack/react-start'
import axios from 'redaxios'

export type CurrentWeather = {
  id: number,
  station: number,
  value: string,
  unit: string,
  meas_hash: number,
}

export const DEPLOY_URL = 'http://localhost:3000'

export const currentWeatherQueryOptions = () =>
  queryOptions({
    queryKey: ['currentWeather'],
    queryFn: () =>
      axios.get<Array<CurrentWeather>>(DEPLOY_URL + '/api/currentweather')
        .then((s) => s.data)
        .catch(() => {
          throw new Error('Failed to fetch weather')
        }),
  })

export const observedAt = () => {
  let s = new Date().toISOString().slice(0, 15).replace('T', ' ') + '0:00'
  return new Date(s).getTime() / 1000
}