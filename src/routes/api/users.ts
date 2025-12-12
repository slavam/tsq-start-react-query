import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import axios from 'redaxios'
import type { User } from '../../utils/users'

export const Route = createFileRoute('/api/users')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info('Fetching users... @', request.url)
        const res = await axios.get<Array<User>>(
          // const res = await axios.get<Meteostations>(
          // 'http://10.54.1.11:8083/stations/meteostations?format=json'
          'https://jsonplaceholder.typicode.com/users',
        )
        // console.log(JSON.stringify(res.data))
        const list = res.data.slice(0, 10)
        return json(
          // list.map((s) => ({ id: s.index, name: s.name })),
          list.map((u) => ({ id: u.id, name: u.name, email: u.email })),
        )
      },
    },
  },
})
