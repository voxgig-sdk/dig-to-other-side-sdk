<?php
declare(strict_types=1);

// DigToOtherSide SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DigToOtherSideMakeContext
{
    public static function call(array $ctxmap, ?DigToOtherSideContext $basectx): DigToOtherSideContext
    {
        return new DigToOtherSideContext($ctxmap, $basectx);
    }
}
