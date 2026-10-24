# DigToOtherSide SDK utility: make_context
require_relative '../core/context'
module DigToOtherSideUtilities
  MakeContext = ->(ctxmap, basectx) {
    DigToOtherSideContext.new(ctxmap, basectx)
  }
end
