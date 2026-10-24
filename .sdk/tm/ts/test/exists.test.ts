
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DigToOtherSideSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DigToOtherSideSDK.test()
    equal(testsdk instanceof DigToOtherSideSDK, true,
      'DigToOtherSideSDK.test() must return a client synchronously')
  })

})
