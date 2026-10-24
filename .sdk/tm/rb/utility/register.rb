# DigToOtherSide SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DigToOtherSideUtility.registrar = ->(u) {
  u.clean = DigToOtherSideUtilities::Clean
  u.clean_add = DigToOtherSideUtilities::CleanAdd
  u.clean_explain = DigToOtherSideUtilities::CleanExplain
  u.done = DigToOtherSideUtilities::Done
  u.make_error = DigToOtherSideUtilities::MakeError
  u.feature_add = DigToOtherSideUtilities::FeatureAdd
  u.feature_hook = DigToOtherSideUtilities::FeatureHook
  u.feature_init = DigToOtherSideUtilities::FeatureInit
  u.fetcher = DigToOtherSideUtilities::Fetcher
  u.make_fetch_def = DigToOtherSideUtilities::MakeFetchDef
  u.make_context = DigToOtherSideUtilities::MakeContext
  u.make_options = DigToOtherSideUtilities::MakeOptions
  u.make_request = DigToOtherSideUtilities::MakeRequest
  u.make_response = DigToOtherSideUtilities::MakeResponse
  u.make_result = DigToOtherSideUtilities::MakeResult
  u.make_point = DigToOtherSideUtilities::MakePoint
  u.make_spec = DigToOtherSideUtilities::MakeSpec
  u.make_url = DigToOtherSideUtilities::MakeUrl
  u.param = DigToOtherSideUtilities::Param
  u.prepare_auth = DigToOtherSideUtilities::PrepareAuth
  u.prepare_body = DigToOtherSideUtilities::PrepareBody
  u.prepare_headers = DigToOtherSideUtilities::PrepareHeaders
  u.prepare_method = DigToOtherSideUtilities::PrepareMethod
  u.prepare_params = DigToOtherSideUtilities::PrepareParams
  u.prepare_path = DigToOtherSideUtilities::PreparePath
  u.prepare_query = DigToOtherSideUtilities::PrepareQuery
  u.graphql_body = DigToOtherSideUtilities::GraphqlBody
  u.graphql_errors = DigToOtherSideUtilities::GraphqlErrors
  u.result_basic = DigToOtherSideUtilities::ResultBasic
  u.result_body = DigToOtherSideUtilities::ResultBody
  u.result_headers = DigToOtherSideUtilities::ResultHeaders
  u.transform_request = DigToOtherSideUtilities::TransformRequest
  u.transform_response = DigToOtherSideUtilities::TransformResponse
}
