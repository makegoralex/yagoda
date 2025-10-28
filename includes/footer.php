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

    <script>
      (function () {
        const toggle = document.querySelector('.nav-toggle');
        const nav = document.querySelector('.site-nav');
        if (!toggle || !nav) return;

        const setState = (isOpen) => {
          nav.classList.toggle('open', isOpen);
          toggle.setAttribute('aria-expanded', String(isOpen));
        };

        toggle.addEventListener('click', () => {
          const nextState = !nav.classList.contains('open');
          setState(nextState);
        });

        nav.querySelectorAll('a').forEach((link) => {
          link.addEventListener('click', () => setState(false));
        });

        window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
            setState(false);
          }
        });
      })();
    </script>

  </body>
</html>
