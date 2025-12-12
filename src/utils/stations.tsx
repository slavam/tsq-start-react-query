import { queryOptions } from '@tanstack/react-query'
import axios from 'redaxios'

export type Station = {
  index: string
  name: string
}

export const DEPLOY_URL = 'http://localhost:3000'

export const stationsQueryOptions = () =>
  queryOptions({
    queryKey: ['stations'],
    queryFn: () =>
      axios
        .get<Array<Station>>(DEPLOY_URL + '/stations')
        .then((r) => r.data)
        .catch(() => {
          throw new Error('Failed to fetch stations')
        }),
  })
