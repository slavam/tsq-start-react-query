import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/stations/')({
    component: StationsIndexComponent,
})

function StationsIndexComponent() {
    // return null //<div>Select a station.</div>
}
