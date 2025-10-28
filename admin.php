<?php
require_once __DIR__ . '/includes/site.php';

$siteData = load_site_data();
$notice = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = $_POST['site_data'] ?? '';
    $decoded = json_decode($raw, true);

    if (!is_array($decoded)) {
        $notice = ['type' => 'error', 'message' => 'Не удалось распознать данные. Проверьте заполнение формы.'];
    } else {
        if (save_site_data($decoded)) {
            $siteData = $decoded;
            $notice = ['type' => 'success', 'message' => 'Изменения сохранены.'];
        } else {
            $notice = ['type' => 'error', 'message' => 'Не удалось сохранить файл данных. Проверьте права на запись для папки data/.'];
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Админка — Ягода Coffee</title>
    <link rel="stylesheet" href="assets/admin.css" />
  </head>
  <body>
    <header>
      <h1>Админка сайта Ягода Coffee</h1>
      <p>Отредактируйте тексты, цвета и каталоги. После сохранения изменения сразу появятся на сайте.</p>
    </header>
    <main>
      <?php if ($notice): ?>
        <div class="notice <?= $notice['type'] === 'success' ? 'success' : '' ?>">
          <?= htmlspecialchars($notice['message']) ?>
        </div>
      <?php endif; ?>
      <form id="site-form" method="post">
        <input type="hidden" name="site_data" id="site-data-input" />

        <section id="branding-section">
          <h2>Брендинг и контакты</h2>
          <div class="list-editor" data-editor="branding"></div>
        </section>

        <section id="about-section">
          <h2>Страница «О кофейне»</h2>
          <div class="list-editor" data-editor="about"></div>
        </section>

        <section id="mobile-section">
          <h2>Страница «Выездной кофебар»</h2>
          <div class="list-editor" data-editor="mobile"></div>
        </section>

        <section id="dessert-section">
          <h2>Каталог десертов</h2>
          <div class="list-editor" data-editor="desserts"></div>
        </section>

        <div class="inline-actions">
          <button type="submit" class="button secondary">Сохранить изменения</button>
          <a class="button link" href="index.php">Вернуться на сайт</a>
        </div>
      </form>
    </main>
    <template id="list-item-template">
      <div class="list-item">
        <button type="button" class="remove-item" title="Удалить">×</button>
        <div class="fields"></div>
      </div>
    </template>
    <script>
      window.initialData = <?= json_encode($siteData, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) ?>;
    </script>
    <script src="assets/admin.js"></script>
  </body>
</html>
