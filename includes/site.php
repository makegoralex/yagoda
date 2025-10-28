<?php

declare(strict_types=1);

const SITE_DATA_PATH = __DIR__ . '/../data/siteData.json';

/**
 * Load site data from JSON file.
 */
function load_site_data(): array
{
    if (!file_exists(SITE_DATA_PATH)) {
        return [];
    }

    $contents = file_get_contents(SITE_DATA_PATH);
    if ($contents === false || $contents === '') {
        return [];
    }

    $decoded = json_decode($contents, true);

    return is_array($decoded) ? $decoded : [];
}

/**
 * Persist updated site data back to disk.
 */
function save_site_data(array $data): bool
{
    $encoded = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($encoded === false) {
        return false;
    }

    return (bool) file_put_contents(SITE_DATA_PATH, $encoded . PHP_EOL);
}

/**
 * Helper to fetch a value from the branding palette.
 */
function branding_color(array $data, string $key, string $fallback): string
{
    return $data['branding'][$key] ?? $fallback;
}

