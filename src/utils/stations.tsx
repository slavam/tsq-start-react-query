import { queryOptions } from '@tanstack/react-query'
import axios from 'redaxios'

export type Station = {
  sindex: number,
  station_name: string
  // index: string
  // name: string
  // lat: string
  // lon: string
  // time_shift: string
  // points_count: string
}

export const DEPLOY_URL = 'http://localhost:3000'

export const stationsQueryOptions = () =>
  queryOptions({
    queryKey: ['stations'],
    queryFn: () =>
      axios
        .get<Array<Station>>(DEPLOY_URL + '/api/stations')
        .then((s) => s.data)
        .catch(() => {
          throw new Error('Failed to fetch stations')
        }),
  })
