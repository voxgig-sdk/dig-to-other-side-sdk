<?php
declare(strict_types=1);

// DigToOtherSide SDK utility: result_headers

class DigToOtherSideResultHeaders
{
    public static function call(DigToOtherSideContext $ctx): ?DigToOtherSideResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
