// Typed models for the DigToOtherSide SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Dig {
  data: Record<string, any>
  meta: Record<string, any>
}

export interface DigLoadMatch {
  lat: number
  lon: number
}

