import Studio from './Studio'
import { metadata as studioMetadata } from 'next-sanity/studio/metadata'

export const dynamic = 'force-static'

export const metadata = {
    ...studioMetadata,
    title: 'Loading Studio...',
}

export default function StudioPage() {
    return <Studio />
}
