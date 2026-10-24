# DigToOtherSide SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DigToOtherSideFeatures
  def self.make_feature(name)
    case name
    when "base"
      DigToOtherSideBaseFeature.new
    when "ratelimit"
      DigToOtherSideRatelimitFeature.new
    when "retry"
      DigToOtherSideRetryFeature.new
    when "test"
      DigToOtherSideTestFeature.new
    when "timeout"
      DigToOtherSideTimeoutFeature.new
    else
      DigToOtherSideBaseFeature.new
    end
  end
end
