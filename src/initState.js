import data from './scotland.json'

export default {
  config: {
    container: 'five-nine-north-map',
    currentYear: new Date().getFullYear(),
  },
  map: {
    data,
    datasetId: 'cj81ey7id7bsi2qqkw0swpxt7',
    username: '59northltd',
    viewport: {
      width: 800,
      height: 600,
      latitude: 59.440081631095694,
      longitude: 3.4301109330973816,
      zoom: 4,
      bearing: 0,
      pitch: 0,
      altitude: 1.5,
      maxZoom: 20,
      minZoom: 0,
      maxPitch: 60,
      minPitch: 0,
      maxLatitude: 85.05113,
      minLatitude: -85.05113,
    },
    settings: {
      // 'mapbox://styles/kaicurry/cj8zxu6rneguv2ss9fuzutfvk',
      mapStyle: 'mapbox://styles/59northltd/cj81eok788lt82rt5tt8k383n',
      // mapboxApiAccessToken: 'pk.eyJ1Ijoia2FpY3VycnkiLCJhIjoiY2o4enhuOTl2MG0xejJxbzRmMjVxY3RrOCJ9.DzeTwpSzvy-zWbjCpj8ROQ',
      mapboxApiAccessToken: 'pk.eyJ1IjoiNTlub3J0aGx0ZCIsImEiOiJjajFsMG9nYTYwMDBvMnFtaDR0djl2azZoIn0.ZPoadqCb8AWQ8B4GSm0fzA',
    },
  },
}
