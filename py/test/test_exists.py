# DigToOtherSide SDK exists test

import pytest
from digtootherside_sdk import DigToOtherSideSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DigToOtherSideSDK.test(None, None)
        assert testsdk is not None
