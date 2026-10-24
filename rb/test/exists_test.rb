# DigToOtherSide SDK exists test

require "minitest/autorun"
require_relative "../DigToOtherSide_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DigToOtherSideSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
