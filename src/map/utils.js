
export const baseUrl = 'https://api.mapbox.com'
export function getDataUrl({ datasetId, token, username }) {
  return `${baseUrl}/datasets/v1/${username}/${datasetId}/features?access_token=${token}`
}
