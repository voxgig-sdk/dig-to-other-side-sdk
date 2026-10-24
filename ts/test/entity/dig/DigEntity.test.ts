

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DigToOtherSideSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DigEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIG_TO_OTHER_SIDE_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIG_TO_OTHER_SIDE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigToOtherSideSDK.test()
    const ent = testsdk.Dig()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigToOtherSideSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Dig().load({"lat":"x","lon":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIG_TO_OTHER_SIDE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dig.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":true,"sh":"A dig straight through the centre of the Earth from one point to its antipode.","t":"`$OBJECT`","key$":"data","index$":0},"meta":{"a":true,"h":"Meta","n":"meta","r":true,"t":"`$OBJECT`","key$":"meta","index$":1}},"name":"dig","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /dig","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":44.4268,"k":"query","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"ex":26.1025,"k":"query","n":"lon","or":"lon","r":true,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"GET","o":"/dig","q":{"exist":["lat","lon"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"dig"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"dig","name__orig":"dig","Name":"Dig","name_":"dig","name-":"dig","NAME":"DIG","index$":0}, {"active":true,"entity":"dig","key$":"BasicDigFlow","kind":"basic","name":"BasicDigFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dig_ref01","srcdatavar":"dig_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dig_ref01"}}],"index$":0}]}, 'Dig', {"GET /dig":{"protocol":"http","parameters":[{"name":"lat","in":"query","required":true,"description":"Latitude in decimal degrees, -90 to 90, south negative.","schema":{"type":"number","minimum":-90,"maximum":90},"example":44.4268,"index$":0},{"name":"lon","in":"query","required":true,"description":"Longitude in decimal degrees, -180 to 180, west negative. Values past 180 are refused, not wrapped.","schema":{"type":"number","minimum":-180,"maximum":180},"example":26.1025,"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dig_ref01_data = Object.values(setup.data.existing.dig)[0] as any

    // LOAD
    const dig_ref01_ent = client.Dig()
    const dig_ref01_match_dt0: any = {}
    const dig_ref01_data_dt0 = (await dig_ref01_ent.load(dig_ref01_match_dt0)).data()
    assert(null != dig_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/dig/DigTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DigToOtherSideSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['dig01','dig02','dig03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIG_TO_OTHER_SIDE_TEST_DIG_ENTID': idmap,
    'DIG_TO_OTHER_SIDE_TEST_LIVE': 'FALSE',
    'DIG_TO_OTHER_SIDE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DIG_TO_OTHER_SIDE_TEST_DIG_ENTID']

  const live = 'TRUE' === env.DIG_TO_OTHER_SIDE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIG_TO_OTHER_SIDE_TEST_DIG_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DigToOtherSideSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.DIG_TO_OTHER_SIDE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
