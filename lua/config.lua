-- DigToOtherSide SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "DigToOtherSide",
      slug = "dig-to-other-side",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.tasta.space/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["dig"] = {},
      },
    },
    entity = {
      ["dig"] = {
        ["fields"] = {
          {
            ["name"] = "data",
            ["title"] = "Data",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "A dig straight through the centre of the Earth from one point to its antipode.",
          },
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
        },
        ["name"] = "dig",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/dig",
                ["segments"] = {
                  {
                    ["lit"] = "dig",
                  },
                },
                ["parts"] = {
                  "dig",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 44.4268,
                    },
                    {
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 26.1025,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "lat",
                    "lon",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
