import { queryOptions, useQuery } from '@tanstack/react-query'
// import axios from 'axios'

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
    queryFn: async () => {
      const res = await fetch(DEPLOY_URL + '/api/stations')
      if (!res.ok) throw new Error('Failed to fetch stations')
      return (await res.json()) as Array<{ sindex: number; station_name: string }>
    },
    // initialData: [] as Array<{ sindex: number; station_name: string }>,
    staleTime: 5 * 60_000, // 5 мин — данные статичные
    // queryFn: () =>
    //   axios
    //     .get<Array<Station>>(DEPLOY_URL + '/api/stations')
    //     .then((s) => s.data)
    //     .catch(() => {
    //       throw new Error('Failed to fetch stations')
    //     }),
  })

export function useStations() {
  return useQuery(stationsQueryOptions())
}
