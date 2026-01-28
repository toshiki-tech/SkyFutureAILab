import createImageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'Sanity projectId/dataset missing. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local'
    )
  }
}

const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null

export function urlFor(source: any) {
  if (!builder) {
    // Return a dummy object that supports the chain methods
    return {
      width: () => ({
        height: () => ({
          url: () => ''
        })
      }),
      image: () => ({
        width: () => ({
          height: () => ({
            url: () => ''
          })
        })
      })
    }
  }
  return builder.image(source)
}
