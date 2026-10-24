# frozen_string_literal: true

# Typed models for the DigToOtherSide SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Dig entity data model.
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] meta
#   @return [Hash]
Dig = Struct.new(
  :data,
  :meta,
  keyword_init: true
)

# Request payload for Dig#load.
#
# @!attribute [rw] lat
#   @return [Float]
#
# @!attribute [rw] lon
#   @return [Float]
DigLoadMatch = Struct.new(
  :lat,
  :lon,
  keyword_init: true
)

