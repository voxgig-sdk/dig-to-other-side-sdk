-- DigToOtherSide SDK exists test

local sdk = require("dig-to-other-side_sdk")

describe("DigToOtherSideSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
