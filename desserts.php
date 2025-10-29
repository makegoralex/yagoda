<?php
require_once __DIR__ . '/includes/site.php';

$siteData = load_site_data();
$active = 'desserts';
include __DIR__ . '/includes/header.php';

$catalog = $siteData['dessertCatalog'] ?? [];
$items = $catalog['items'] ?? [];
?>
<section class="hero hero--compact">
  <div class="hero-content">
    <span class="badge">Каталог десертов</span>
    <h2><?= htmlspecialchars($catalog['headline'] ?? 'Каталог десертов для кофеен и мероприятий') ?></h2>
    <?php if (!empty($catalog['intro'])): ?>
      <p><?= htmlspecialchars($catalog['intro']) ?></p>
    <?php endif; ?>
    <div class="inline-actions">
      <a class="button" href="mailto:<?= htmlspecialchars(($siteData['contact']['email'] ?? 'hello@yagoda.coffee')) ?>">Запросить прайс</a>
      <a class="button" href="#dessert-catalog" style="background: var(--accent-color);">Смотреть позиции</a>
    </div>
  </div>
</section>
<section class="section">
  <?php if (!empty($catalog['minimumOrder']) || !empty($catalog['delivery'])): ?>
    <div class="card">
      <?php if (!empty($catalog['minimumOrder'])): ?>
        <p><strong>Минимальный заказ:</strong> <?= htmlspecialchars($catalog['minimumOrder']) ?></p>
      <?php endif; ?>
      <?php if (!empty($catalog['delivery'])): ?>
        <p><strong>Доставка:</strong> <?= htmlspecialchars($catalog['delivery']) ?></p>
      <?php endif; ?>
    </div>
  <?php endif; ?>
</section>
<section class="section" id="dessert-catalog">
  <div class="grid three">
    <?php foreach ($items as $item): ?>
      <article class="card">
        <?php if (!empty($item['image'])): ?>
          <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['name'] ?? '') ?>" />
        <?php endif; ?>
        <h3><?= htmlspecialchars($item['name'] ?? '') ?></h3>
        <p><?= htmlspecialchars($item['description'] ?? '') ?></p>
        <?php if (!empty($item['portion'])): ?>
          <p><strong>Порция:</strong> <?= htmlspecialchars($item['portion']) ?></p>
        <?php endif; ?>
        <?php if (!empty($item['priceFrom'])): ?>
          <p><strong>Цена:</strong> <?= htmlspecialchars($item['priceFrom']) ?></p>
        <?php endif; ?>
      </article>
    <?php endforeach; ?>
  </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
