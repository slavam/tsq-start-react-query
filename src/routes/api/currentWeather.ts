import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import axios from 'redaxios'
import { CurrentWeather, observedAt } from '../../utils/currentWeather'

export const Route = createFileRoute('/api/currentWeather')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info('Fetching current weather... @', request.url)
        let query = `http://10.54.1.30:8640/get?limit=100&stations=34519&notbefore=${observedAt() + 3600 * 3}&streams=1&source=10202`
        const res = await axios.get<Array<CurrentWeather>>(
          query
        )
        const list = res.data
        console.log(query, list.length)
        return json(
          list.length > 0 ? list.map((s) => ({ id: s.id, station: s.station, value: s.value, meas_hash: s.meas_hash })) : null,
        )
      },
    },
  },
})

