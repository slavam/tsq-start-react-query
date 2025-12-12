import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import axios from 'redaxios'
import type { Meteostations } from '../../utils/stations'

export const Route = createFileRoute('/api/stations')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info('Fetching stations... @', request.url)
        const res = await axios.get<Meteostations>(
          'http://10.54.1.11:8083/stations/meteostations?format=json'
          // 'https://jsonplaceholder.typicode.com/users',
        )
        const list = res.data.meteostations //.slice(0, 10)
        return json(
          list.map((s) => ({ index: s.index, name: s.name })),
        )
      },
    },
  },
})
