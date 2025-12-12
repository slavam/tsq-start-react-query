import { queryOptions } from '@tanstack/react-query'
import axios from 'redaxios'

export type User = {
  id: number
  name: string
  email: string
}
// export type Station = {
//   index: string
//   name: string
//   lat: string
//   lon: string
//   time_shift: string
//   points_count: string
// }
// export type Meteostations = {
//   meteostations: Station[]
// }

export const DEPLOY_URL = 'http://localhost:3000'

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: () =>
      axios
        .get<Array<User>>(DEPLOY_URL + '/api/users')
        // .get<Meteostations>(DEPLOY_URL + '/api/users')
        .then((ms) => ms.data)
        .catch(() => {
          throw new Error('Failed to fetch users')
        }),
  })

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['users', id],
    queryFn: () =>
      axios
        .get<User>(DEPLOY_URL + '/api/users/' + id)
        // .get<Station>(DEPLOY_URL + '/api/users/' + id)
        .then((r) => r.data)
        .catch(() => {
          throw new Error('Failed to fetch user')
        }),
  })
