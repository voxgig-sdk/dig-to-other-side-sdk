# DigToOtherSide SDK utility: prepare_body
require_relative 'media'
module DigToOtherSideUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return DigToOtherSideUtilities.raw_body(ctx.reqdata) if DigToOtherSideUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
