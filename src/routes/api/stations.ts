import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import axios from 'redaxios'
import type { Station } from '../../utils/stations'

export const Route = createFileRoute('/api/stations')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info('Fetching stations... @', request.url)
        const res = await axios.get<Array<Station>>(
          'http://10.54.1.30:8640/stations.json'
        )
        const list = res.data
        return json(
          list.map((s) => ({ sindex: s.sindex, station_name: s.station_name })),
        )
      },
    },
  },
})
