<?php
require_once __DIR__ . '/site.php';

$siteData = $siteData ?? load_site_data();
$active = $active ?? '';
$branding = $siteData['branding'] ?? [];
$primary = branding_color($siteData, 'primaryColor', '#6C2E6A');
$secondary = branding_color($siteData, 'secondaryColor', '#F4ECE6');
$accent = branding_color($siteData, 'accentColor', '#E2534A');
$background = branding_color($siteData, 'backgroundColor', '#FFFFFF');
$textColor = branding_color($siteData, 'textColor', '#1F1F1F');
$name = $branding['name'] ?? 'Ягода Coffee';
$tagline = $branding['tagline'] ?? '';
?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?= htmlspecialchars($name) ?></title>
    <link rel="stylesheet" href="assets/styles.css" />
    <style>
      :root {
        --primary-color: <?= htmlspecialchars($primary) ?>;
        --secondary-color: <?= htmlspecialchars($secondary) ?>;
        --accent-color: <?= htmlspecialchars($accent) ?>;
        --background-color: <?= htmlspecialchars($background) ?>;
        --text-color: <?= htmlspecialchars($textColor) ?>;
      }
    </style>
  </head>
  <body>
    <header>
      <div class="header-inner">
        <div class="branding">
          <h1><?= htmlspecialchars($name) ?></h1>
          <?php if ($tagline): ?>
            <small><?= htmlspecialchars($tagline) ?></small>
          <?php endif; ?>
        </div>

            <li><a href="index.php" class="<?= $active === 'home' ? 'active' : '' ?>">О кофейне</a></li>
            <li><a href="mobile-bar.php" class="<?= $active === 'mobile-bar' ? 'active' : '' ?>">Выездной бар</a></li>
            <li><a href="desserts.php" class="<?= $active === 'desserts' ? 'active' : '' ?>">Десерты</a></li>
            <li><a href="admin.php">Админка</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main>
