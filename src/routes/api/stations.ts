import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import type { Station } from '../../utils/stations'

export const Route = createFileRoute('/api/stations')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          console.info('Fetching stations... @', request.url)
          const res = await axios.get<Station[]>(
            process.env.STATIONS_URL+'',
            { timeout: 5000 }
          )
          return Response.json(
            res.data.map((s) => ({ sindex: s.sindex, station_name: s.station_name })),
            { headers: { 'Cache-Control': 'public, max-age=300' } }
          )
        } catch (e) {
          console.error('stations fetch failed', e)
          return Response.json({ error: 'stations_unavailable' }, { status: 502 })
        }
      },
    },
  },
})
