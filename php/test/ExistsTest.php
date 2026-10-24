<?php
declare(strict_types=1);

// DigToOtherSide SDK exists test

require_once __DIR__ . '/../digtootherside_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = DigToOtherSideSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
