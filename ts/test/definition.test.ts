import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "dig",
    "accessor": "Dig",
    "op": "load",
    "method": "GET",
    "path": "/dig",
    "args": [],
    "select": {
      "lat": 44.4268,
      "lon": 26.1025
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "lat",
      "lon"
    ],
    "queryArgs": [
      {
        "name": "lat",
        "wire": "lat"
      },
      {
        "name": "lon",
        "wire": "lon"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": {
        "from": {
          "lat": 44.4268,
          "lon": 26.1025,
          "place": "Romania",
          "country": "Romania",
          "country_code": "RO",
          "island": "Oahu",
          "surface": "land",
          "water_type": "ocean"
        },
        "to": {
          "lat": 44.4268,
          "lon": 26.1025,
          "place": "Romania",
          "country": "Romania",
          "country_code": "RO",
          "island": "Oahu",
          "surface": "land",
          "water_type": "ocean"
        },
        "land": false,
        "nearest_land": {
          "name": "Chatham Islands",
          "country": "New Zealand",
          "km": 1761,
          "lat": -44.27,
          "lon": -176.11
        },
        "tunnel_km": 12742,
        "fall_minutes": {
          "uniform_earth": 42.2,
          "real_earth": 38.2
        },
        "top_speed_kmh": 28475,
        "depth_record": {
          "name": "Kola Superdeep Borehole",
          "where": "Murmansk Oblast, Russia",
          "depth_m": 12262,
          "year": 1989,
          "share_of_tunnel_percent": 0.0962,
          "years_for_the_whole_tunnel_at_that_pace": 19700
        },
        "verdict": "Splash landing in the South Pacific Ocean. Learn to swim first, the shore is 1,761 km away.",
        "image": "https://api.tasta.space/v1/dig/image?lat=44.4268&lon=26.1025"
      },
      "meta": {
        "radius_km": 6371,
        "notes": {},
        "data": "Natural Earth (public domain)"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
