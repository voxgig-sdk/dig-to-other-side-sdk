"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DigEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIG_TO_OTHER_SIDE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIG_TO_OTHER_SIDE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigToOtherSideSDK.test();
        const ent = testsdk.Dig();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigToOtherSideSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Dig().load({ "lat": "x", "lon": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIG_TO_OTHER_SIDE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dig.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "data": { "a": true, "h": "Data", "n": "data", "r": true, "sh": "A dig straight through the centre of the Earth from one point to its antipode.", "t": "`$OBJECT`", "key$": "data", "index$": 0 }, "meta": { "a": true, "h": "Meta", "n": "meta", "r": true, "t": "`$OBJECT`", "key$": "meta", "index$": 1 } }, "name": "dig", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /dig", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 44.4268, "k": "query", "n": "lat", "or": "lat", "r": true, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "ex": 26.1025, "k": "query", "n": "lon", "or": "lon", "r": true, "t": "`$NUMBER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/dig", "q": { "exist": ["lat", "lon"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "dig" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "dig", "name__orig": "dig", "Name": "Dig", "name_": "dig", "name-": "dig", "NAME": "DIG", "index$": 0 }, { "active": true, "entity": "dig", "key$": "BasicDigFlow", "kind": "basic", "name": "BasicDigFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "dig_ref01", "srcdatavar": "dig_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dig_ref01" } }], "index$": 0 }] }, 'Dig', { "GET /dig": { "protocol": "http", "parameters": [{ "name": "lat", "in": "query", "required": true, "description": "Latitude in decimal degrees, -90 to 90, south negative.", "schema": { "type": "number", "minimum": -90, "maximum": 90 }, "example": 44.4268, "index$": 0 }, { "name": "lon", "in": "query", "required": true, "description": "Longitude in decimal degrees, -180 to 180, west negative. Values past 180 are refused, not wrapped.", "schema": { "type": "number", "minimum": -180, "maximum": 180 }, "example": 26.1025, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let dig_ref01_data = Object.values(setup.data.existing.dig)[0];
        // LOAD
        const dig_ref01_ent = client.Dig();
        const dig_ref01_match_dt0 = {};
        const dig_ref01_data_dt0 = (await dig_ref01_ent.load(dig_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != dig_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dig/DigTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigToOtherSideSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dig01', 'dig02', 'dig03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIG_TO_OTHER_SIDE_TEST_DIG_ENTID': idmap,
        'DIG_TO_OTHER_SIDE_TEST_LIVE': 'FALSE',
        'DIG_TO_OTHER_SIDE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DIG_TO_OTHER_SIDE_TEST_DIG_ENTID'];
    const live = 'TRUE' === env.DIG_TO_OTHER_SIDE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIG_TO_OTHER_SIDE_TEST_DIG_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DigToOtherSideSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.DIG_TO_OTHER_SIDE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=DigEntity.test.js.map