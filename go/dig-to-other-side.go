package voxgigdigtoothersidesdk

import (
	"github.com/voxgig-sdk/dig-to-other-side-sdk/go/core"
	"github.com/voxgig-sdk/dig-to-other-side-sdk/go/entity"
	"github.com/voxgig-sdk/dig-to-other-side-sdk/go/feature"
	_ "github.com/voxgig-sdk/dig-to-other-side-sdk/go/utility"
)

// Type aliases preserve external API.
type DigToOtherSideSDK = core.DigToOtherSideSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DigToOtherSideEntity = core.DigToOtherSideEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DigToOtherSideError = core.DigToOtherSideError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewDigEntityFunc = func(client *core.DigToOtherSideSDK, entopts map[string]any) core.DigToOtherSideEntity {
		return entity.NewDigEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDigToOtherSideSDK = core.NewDigToOtherSideSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewDigToOtherSideSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *DigToOtherSideSDK  { return NewDigToOtherSideSDK(nil) }
func Test() *DigToOtherSideSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
