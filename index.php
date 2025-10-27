<?php
require_once __DIR__ . '/includes/site.php';

$siteData = load_site_data();
$active = 'home';
include __DIR__ . '/includes/header.php';

$about = $siteData['about'] ?? [];
$contact = $siteData['contact'] ?? [];
$photos = $about['photos'] ?? [];
$highlights = $about['highlights'] ?? [];
?>
<section class="hero">
  <div>
    <h2><?= htmlspecialchars($about['intro'] ?? 'Ягода Coffee — уютная кофейня в Пензе') ?></h2>
    <p><?= nl2br(htmlspecialchars($about['description'] ?? '')) ?></p>
    <div class="inline-actions">
      <a class="button" href="mobile-bar.php">Выездной кофебар</a>
      <a class="button" href="desserts.php" style="background: var(--accent-color);">Каталог десертов</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-header">
    <h2>Почему выбирают нас</h2>
  </div>
  <?php if (!empty($highlights)): ?>
    <div class="highlight-list">
      <?php foreach ($highlights as $item): ?>
        <div class="card">
          <?= htmlspecialchars($item) ?>
        </div>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</section>
<section class="section">
  <div class="section-header">
    <h2>Как нас найти</h2>
  </div>
  <div class="contact-card">
    <?php if (!empty($contact['address'])): ?>
      <div>
        <strong>Адрес</strong>
        <p><?= htmlspecialchars($contact['address']) ?></p>
      </div>
    <?php endif; ?>
    <?php if (!empty($contact['hours'])): ?>
      <div>
        <strong>График</strong>
        <p><?= htmlspecialchars($contact['hours']) ?></p>
      </div>
    <?php endif; ?>
    <?php if (!empty($contact['phone']) || !empty($contact['email'])): ?>
      <div>
        <strong>Связаться</strong>
        <?php if (!empty($contact['phone'])): ?>
          <p><a href="tel:<?= htmlspecialchars($contact['phone']) ?>"><?= htmlspecialchars($contact['phone']) ?></a></p>
        <?php endif; ?>
        <?php if (!empty($contact['email'])): ?>
          <p><a href="mailto:<?= htmlspecialchars($contact['email']) ?>"><?= htmlspecialchars($contact['email']) ?></a></p>
        <?php endif; ?>
        <?php if (!empty($contact['instagram'])): ?>
          <p><a href="<?= htmlspecialchars($contact['instagram']) ?>" target="_blank" rel="noopener">Instagram</a></p>
        <?php endif; ?>
      </div>
    <?php endif; ?>
  </div>
</section>
<section class="section">
  <div class="section-header">
    <h2>Галерея</h2>
    <p>Добавьте сюда фотографии из кофейни, когда они будут готовы.</p>
  </div>
  <div class="photo-grid">
    <?php foreach ($photos as $photo): ?>
      <?php if (!empty($photo['url'])): ?>
        <figure>
          <img src="<?= htmlspecialchars($photo['url']) ?>" alt="<?= htmlspecialchars($photo['title'] ?? '') ?>" />
          <?php if (!empty($photo['title'])): ?>
            <figcaption><?= htmlspecialchars($photo['title']) ?></figcaption>
          <?php endif; ?>
        </figure>
      <?php else: ?>
        <div class="photo-placeholder">
          <?= htmlspecialchars($photo['title'] ?? 'Фото скоро будет') ?>
        </div>
      <?php endif; ?>
    <?php endforeach; ?>
  </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
