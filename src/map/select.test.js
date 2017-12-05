import { geoIsLineString } from './select'

/* global test expect */

const feature = {
  type: 'Feature',
  properties: {
    title: 'Longyearbyen (NOR)',
    type: 'primary-port',
    description: 'Longyearbyen is a small coal-mining town on Spitsbergen Island, in Norway\'s Svalbard archipelago. This Arctic town is known for its views of the Northern Lights. The modern Svalbard Museum chronicles the region’s natural and cultural history. It includes a stuffed polar bear. Live bears can occasionally be seen in the area. The North Pole Expeditions Museum recounts early efforts to reach the pole by air.',
    wikipedia: 'https://wikitravel.org/en/Longyearbyen',
  },
  geometry: {
    coordinates: [
      15.658425,
      78.225772,
    ],
    type: 'Point',
  },
  id: '0dff54fffe45030495fc469b5386e1f7',
}

test('geoIsLineString()', () => {
  expect(geoIsLineString(feature)).toBe(false)
})
