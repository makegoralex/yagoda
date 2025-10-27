    </main>
    <footer>
      <?php $contact = $siteData['contact'] ?? []; ?>
      <div class="footer-inner">
        <strong><?= htmlspecialchars($siteData['branding']['name'] ?? 'Ягода Coffee') ?></strong>
        <?php if (!empty($contact['address'])): ?>
          <span>Адрес: <?= htmlspecialchars($contact['address']) ?></span>
        <?php endif; ?>
        <?php if (!empty($contact['hours'])): ?>
          <span>Время работы: <?= htmlspecialchars($contact['hours']) ?></span>
        <?php endif; ?>
        <?php if (!empty($contact['phone'])): ?>
          <span>Телефон: <a href="tel:<?= htmlspecialchars($contact['phone']) ?>"><?= htmlspecialchars($contact['phone']) ?></a></span>
        <?php endif; ?>
        <?php if (!empty($contact['email'])): ?>
          <span>Email: <a href="mailto:<?= htmlspecialchars($contact['email']) ?>"><?= htmlspecialchars($contact['email']) ?></a></span>
        <?php endif; ?>
      </div>
    </footer>
  </body>
</html>
