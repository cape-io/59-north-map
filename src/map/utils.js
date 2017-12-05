
export const baseUrl = 'https://api.mapbox.com'
export function buildDataUrl({ datasetId, token, username }) {
  return `${baseUrl}/datasets/v1/${username}/${datasetId}/features?access_token=${token}`
}

export const title = "'18 Leg 1 // Sweden-Orkney // 474nm"
// '18 Leg 2 // Orkney-Tromsø // 892nm
