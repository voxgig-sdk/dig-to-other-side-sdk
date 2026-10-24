# DigToOtherSide SDK feature factory

from digtootherside_sdk.feature.base_feature import DigToOtherSideBaseFeature
from digtootherside_sdk.feature.ratelimit_feature import DigToOtherSideRatelimitFeature
from digtootherside_sdk.feature.retry_feature import DigToOtherSideRetryFeature
from digtootherside_sdk.feature.test_feature import DigToOtherSideTestFeature
from digtootherside_sdk.feature.timeout_feature import DigToOtherSideTimeoutFeature


_FEATURES = {
    "base": lambda: DigToOtherSideBaseFeature(),
    "ratelimit": lambda: DigToOtherSideRatelimitFeature(),
    "retry": lambda: DigToOtherSideRetryFeature(),
    "test": lambda: DigToOtherSideTestFeature(),
    "timeout": lambda: DigToOtherSideTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
