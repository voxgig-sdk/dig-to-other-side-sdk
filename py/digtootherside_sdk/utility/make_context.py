# DigToOtherSide SDK utility: make_context

from digtootherside_sdk.core.context import DigToOtherSideContext


def make_context_util(ctxmap, basectx):
    return DigToOtherSideContext(ctxmap, basectx)
