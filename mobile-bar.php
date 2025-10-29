<?php
require_once __DIR__ . '/includes/site.php';

$siteData = load_site_data();
$active = 'mobile-bar';
include __DIR__ . '/includes/header.php';

$mobile = $siteData['mobileCoffeeBar'] ?? [];
$services = $mobile['services'] ?? [];
$requirements = $mobile['requirements'] ?? [];
$pricing = $mobile['pricingExamples'] ?? [];
$extras = $mobile['extras'] ?? [];
?>

</section>
<section class="section">
  <div class="section-header">
    <h2>Что входит</h2>
  </div>
  <div class="grid two">
    <?php foreach ($services as $item): ?>
      <div class="card">
        <?= htmlspecialchars($item) ?>
      </div>
    <?php endforeach; ?>
  </div>
</section>
<section class="section">
  <div class="section-header">
    <h2>Технические требования</h2>
  </div>
  <ul class="list-inline">
    <?php foreach ($requirements as $item): ?>
      <li><?= htmlspecialchars($item) ?></li>
    <?php endforeach; ?>
  </ul>
</section>

  <div class="section-header">
    <h2>Примеры пакетов</h2>
  </div>
  <div class="pricing-grid">
    <?php foreach ($pricing as $item): ?>
      <div class="pricing-card">
        <strong><?= htmlspecialchars($item['title'] ?? '') ?></strong>
        <?php if (!empty($item['price'])): ?>
          <div class="badge"><?= htmlspecialchars($item['price']) ?></div>
        <?php endif; ?>
        <p><?= htmlspecialchars($item['description'] ?? '') ?></p>
      </div>
    <?php endforeach; ?>
  </div>
</section>
<section class="section">
  <div class="section-header">
    <h2>Дополнительно</h2>
  </div>
  <div class="grid two">
    <?php foreach ($extras as $item): ?>
      <div class="card">
        <?= htmlspecialchars($item) ?>
      </div>
    <?php endforeach; ?>
  </div>
  <?php if (!empty($mobile['cta'])): ?>
    <p style="margin-top: 2rem; font-weight: 600;"><?= htmlspecialchars($mobile['cta']) ?></p>
  <?php endif; ?>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
