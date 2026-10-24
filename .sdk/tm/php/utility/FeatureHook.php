<?php
declare(strict_types=1);

// DigToOtherSide SDK utility: feature_hook

class DigToOtherSideFeatureHook
{
    public static function call(DigToOtherSideContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
