import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const API_URL =
  publicRuntimeConfig.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export function fromImageToURL(image: any) {
  if (!image) {
    return '/public/assets/images/logo-loyalty.jpg'
  }
  if (image.includes('assets')) {
    return image
  }
  if (image.indexOf('/') === 0) {
    return `${API_URL}${image}`
  }

  return image
}
