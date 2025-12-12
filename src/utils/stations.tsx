import { queryOptions } from '@tanstack/react-query'
import axios from 'redaxios'

export type Station = {
  index: string
  name: string
  lat: string
  lon: string
  time_shift: string
  points_count: string
}
export type Meteostations = {
  meteostations: Station[]
}

export const DEPLOY_URL = 'http://localhost:3000'

export const stationsQueryOptions = () =>
  queryOptions({
    queryKey: ['stations'],
    queryFn: () =>
      axios
        .get<Meteostations>(DEPLOY_URL + '/api/stations')
        .then((r) => r.data.meteostations)
        .catch(() => {
          throw new Error('Failed to fetch stations')
        }),
  })

// export const userQueryOptions = (id: string) =>
//   queryOptions({
//     queryKey: ['users', id],
//     queryFn: () =>
//       axios
//         .get<Station>(DEPLOY_URL + '/api/stations/' + id)
//         .then((r) => r.data)
//         .catch(() => {
//           throw new Error('Failed to fetch station')
//         }),
//   })
