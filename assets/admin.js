(function () {
  const state = window.initialData || {};
  const form = document.getElementById('site-form');
  const hiddenInput = document.getElementById('site-data-input');
  const template = document.getElementById('list-item-template');
  const listConfigs = new Map();

  function createField(labelText, value, options = {}) {
    const wrapper = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = labelText;
    let input;
    if (options.type === 'textarea') {
      input = document.createElement('textarea');
      if (options.rows) {
        input.rows = options.rows;
      }
    } else {
      input = document.createElement('input');
      input.type = options.type || 'text';
    }
    input.value = value || '';
    if (options.placeholder) {
      input.placeholder = options.placeholder;
    }
    if (options.dataset) {
      Object.entries(options.dataset).forEach(([key, val]) => {
        input.dataset[key] = val;
      });
    }
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    if (options.note) {
      const note = document.createElement('small');
      note.textContent = options.note;
      wrapper.appendChild(note);
    }
    return wrapper;
  }

  function createHeading(text) {
    const heading = document.createElement('h3');
    heading.textContent = text;
    return heading;
  }

  function addListItem(container, config, value) {
    const node = template.content.firstElementChild.cloneNode(true);
    const fieldsWrap = node.querySelector('.fields');

    if (config.type === 'string') {
      const field = document.createElement('div');
      const label = document.createElement('label');
      label.textContent = config.itemLabel || 'Значение';
      const input = document.createElement('input');
      input.type = 'text';
      input.value = value || '';
      input.dataset.field = 'value';
      if (config.placeholder) {
        input.placeholder = config.placeholder;
      }
      field.appendChild(label);
      field.appendChild(input);
      fieldsWrap.appendChild(field);
    } else if (config.type === 'object') {
      config.fields.forEach((fieldConfig) => {
        const field = document.createElement('div');
        const label = document.createElement('label');
        label.textContent = fieldConfig.label;
        let input;
        if (fieldConfig.type === 'textarea') {
          input = document.createElement('textarea');
          input.rows = fieldConfig.rows || 3;
        } else {
          input = document.createElement('input');
          input.type = fieldConfig.type || 'text';
        }
        input.dataset.field = fieldConfig.name;
        input.value = (value && value[fieldConfig.name]) || '';
        if (fieldConfig.placeholder) {
          input.placeholder = fieldConfig.placeholder;
        }
        field.appendChild(label);
        field.appendChild(input);
        fieldsWrap.appendChild(field);
      });
    }

    node.querySelector('.remove-item').addEventListener('click', function () {
      node.remove();
    });

    container.appendChild(node);
  }

  function createListBlock(title, bind, config, values) {
    const wrapper = document.createElement('div');
    wrapper.className = 'list-block';
    wrapper.appendChild(createHeading(title));
    const listContainer = document.createElement('div');
    listContainer.className = 'list-container';
    listContainer.dataset.listBind = bind;
    listConfigs.set(listContainer, config);

    (values || []).forEach((item) => addListItem(listContainer, config, item));

    const actions = document.createElement('div');
    actions.className = 'inline-actions';
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'button';
    addButton.textContent = config.addLabel || 'Добавить';
    addButton.addEventListener('click', function () {
      addListItem(listContainer, config, config.createEmpty ? config.createEmpty() : config.type === 'string' ? '' : {});
    });
    actions.appendChild(addButton);

    wrapper.appendChild(listContainer);
    wrapper.appendChild(actions);

    return wrapper;
  }

  function renderBranding(container, data) {
    container.innerHTML = '';
    const branding = data.branding || {};
    const contact = data.contact || {};

    container.appendChild(createHeading('Основные настройки'));
    container.appendChild(
      createField('Название кофейни', branding.name || '', {
        dataset: { branding: 'name' }
      })
    );
    container.appendChild(
      createField('Подзаголовок', branding.tagline || '', {
        dataset: { branding: 'tagline' },
        placeholder: 'Короткое описание слогана'
      })
    );

    container.appendChild(createHeading('Цветовая схема'));
    const colors = [
      ['primaryColor', 'Основной цвет'],
      ['secondaryColor', 'Фоновые блоки'],
      ['accentColor', 'Акцент'],
      ['backgroundColor', 'Фон сайта'],
      ['textColor', 'Основной текст']
    ];

    colors.forEach(([key, label]) => {
      container.appendChild(
        createField(label, branding[key] || '#000000', {
          type: 'color',
          dataset: { branding: key }
        })
      );
    });

    container.appendChild(createHeading('Контакты'));
    container.appendChild(
      createField('Адрес', contact.address || '', {
        dataset: { contact: 'address' }
      })
    );
    container.appendChild(
      createField('Часы работы', contact.hours || '', {
        dataset: { contact: 'hours' }
      })
    );
    container.appendChild(
      createField('Телефон', contact.phone || '', {
        dataset: { contact: 'phone' }
      })
    );
    container.appendChild(
      createField('Email', contact.email || '', {
        type: 'email',
        dataset: { contact: 'email' }
      })
    );
    container.appendChild(
      createField('Instagram', contact.instagram || '', {
        type: 'url',
        dataset: { contact: 'instagram' },
        note: 'Укажите ссылку вида https://instagram.com/...'
      })
    );
  }

  function renderAbout(container, data) {
    container.innerHTML = '';
    const about = data.about || {};
    container.appendChild(createHeading('Основной текст'));
    container.appendChild(
      createField('Интро', about.intro || '', {
        dataset: { about: 'intro' }
      })
    );
    container.appendChild(
      createField('Описание', about.description || '', {
        type: 'textarea',
        rows: 5,
        dataset: { about: 'description' }
      })
    );

    container.appendChild(
      createListBlock('Преимущества', 'about.highlights', {
        type: 'string',
        itemLabel: 'Преимущество',
        placeholder: 'Например: Своя обжарка зерна'
      }, about.highlights || [])
    );

    container.appendChild(
      createListBlock('Фотографии', 'about.photos', {
        type: 'object',
        addLabel: 'Добавить фото',
        fields: [
          { name: 'title', label: 'Подпись' },
          { name: 'url', label: 'Ссылка на изображение', type: 'url', placeholder: 'https://example.com/photo.jpg' }
        ],
        createEmpty: function () {
          return { title: '', url: '' };
        }
      }, about.photos || [])
    );
  }

  function renderMobile(container, data) {
    container.innerHTML = '';
    const mobile = data.mobileCoffeeBar || {};

    container.appendChild(createHeading('Описание услуги'));
    container.appendChild(
      createField('Заголовок', mobile.headline || '', {
        dataset: { mobile: 'headline' }
      })
    );
    container.appendChild(
      createField('Подзаголовок', mobile.subheadline || '', {
        dataset: { mobile: 'subheadline' }
      })
    );
    container.appendChild(
      createField('Описание', mobile.description || '', {
        type: 'textarea',
        rows: 6,
        dataset: { mobile: 'description' }
      })
    );

    container.appendChild(
      createListBlock('Что входит', 'mobile.services', {
        type: 'string',
        itemLabel: 'Пункт услуги',
        placeholder: 'Например: Брендирование стаканчиков'
      }, mobile.services || [])
    );

    container.appendChild(
      createListBlock('Технические требования', 'mobile.requirements', {
        type: 'string',
        itemLabel: 'Требование',
        placeholder: 'Например: Электричество 4 кВт'
      }, mobile.requirements || [])
    );

    container.appendChild(
      createListBlock('Примеры пакетов', 'mobile.pricingExamples', {
        type: 'object',
        addLabel: 'Добавить пакет',
        fields: [
          { name: 'title', label: 'Название пакета' },
          { name: 'price', label: 'Стоимость', placeholder: 'от 18 000 ₽' },
          { name: 'description', label: 'Описание', type: 'textarea', rows: 3 }
        ],
        createEmpty: function () {
          return { title: '', price: '', description: '' };
        }
      }, mobile.pricingExamples || [])
    );

    container.appendChild(
      createListBlock('Дополнительно', 'mobile.extras', {
        type: 'string',
        itemLabel: 'Дополнительная опция',
        placeholder: 'Например: Альтернативное молоко'
      }, mobile.extras || [])
    );

    container.appendChild(
      createField('Призыв к действию', mobile.cta || '', {
        dataset: { mobile: 'cta' },
        placeholder: 'Например: Расскажите нам о мероприятии...'
      })
    );
  }

  function renderDesserts(container, data) {
    container.innerHTML = '';
    const desserts = data.dessertCatalog || {};

    container.appendChild(createHeading('Описание каталога'));
    container.appendChild(
      createField('Интро', desserts.intro || '', {
        dataset: { desserts: 'intro' }
      })
    );
    container.appendChild(
      createField('Минимальный заказ', desserts.minimumOrder || '', {
        dataset: { desserts: 'minimumOrder' }
      })
    );
    container.appendChild(
      createField('Доставка', desserts.delivery || '', {
        dataset: { desserts: 'delivery' }
      })
    );

    container.appendChild(
      createListBlock('Позиции каталога', 'desserts.items', {
        type: 'object',
        addLabel: 'Добавить десерт',
        fields: [
          { name: 'name', label: 'Название' },
          { name: 'description', label: 'Описание', type: 'textarea', rows: 3 },
          { name: 'portion', label: 'Порция/вес' },
          { name: 'priceFrom', label: 'Цена', placeholder: 'от 1 800 ₽' },
          { name: 'image', label: 'Ссылка на фото', type: 'url', placeholder: 'https://...' }
        ],
        createEmpty: function () {
          return { name: '', description: '', portion: '', priceFrom: '', image: '' };
        }
      }, desserts.items || [])
    );
  }

  function collectBranding(container) {
    const branding = {};
    const contact = {};
    container.querySelectorAll('[data-branding]').forEach((input) => {
      branding[input.dataset.branding] = input.value.trim();
    });
    container.querySelectorAll('[data-contact]').forEach((input) => {
      contact[input.dataset.contact] = input.value.trim();
    });
    return { branding, contact };
  }

  function collectAbout(container) {
    const about = {};
    container.querySelectorAll('[data-about]').forEach((input) => {
      const key = input.dataset.about;
      about[key] = input.value.trim();
    });
    const lists = container.querySelectorAll('[data-list-bind]');
    lists.forEach((list) => {
      const bind = list.dataset.listBind;
      if (!bind) return;
      const [, key] = bind.split('.');
      about[key] = collectListValues(list);
    });
    return about;
  }

  function collectMobile(container) {
    const mobile = {};
    container.querySelectorAll('[data-mobile]').forEach((input) => {
      const key = input.dataset.mobile;
      mobile[key] = input.value.trim();
    });
    const lists = container.querySelectorAll('[data-list-bind]');
    lists.forEach((list) => {
      const bind = list.dataset.listBind;
      const parts = bind.split('.');
      const key = parts[1];
      mobile[key] = collectListValues(list);
    });
    return mobile;
  }

  function collectDesserts(container) {
    const desserts = {};
    container.querySelectorAll('[data-desserts]').forEach((input) => {
      desserts[input.dataset.desserts] = input.value.trim();
    });
    const lists = container.querySelectorAll('[data-list-bind]');
    lists.forEach((list) => {
      const parts = list.dataset.listBind.split('.');
      desserts[parts[1]] = collectListValues(list);
    });
    return desserts;
  }

  function collectListValues(container) {
    const config = listConfigs.get(container);
    if (!config) {
      return [];
    }
    const items = [];
    container.querySelectorAll('.list-item').forEach((node) => {
      if (config.type === 'string') {
        const input = node.querySelector('[data-field="value"]');
        if (!input) return;
        const value = input.value.trim();
        if (value) {
          items.push(value);
        }
      } else if (config.type === 'object') {
        const item = {};
        let hasValue = false;
        config.fields.forEach((field) => {
          const input = node.querySelector('[data-field="' + field.name + '"]');
          const value = input ? input.value.trim() : '';
          if (value) {
            hasValue = true;
          }
          item[field.name] = value;
        });
        if (hasValue) {
          items.push(item);
        }
      }
    });
    return items;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {};

    const brandingSection = document.querySelector('[data-editor="branding"]');
    const aboutSection = document.querySelector('[data-editor="about"]');
    const mobileSection = document.querySelector('[data-editor="mobile"]');
    const dessertSection = document.querySelector('[data-editor="desserts"]');

    const brandingResult = collectBranding(brandingSection);
    payload.branding = brandingResult.branding;
    payload.contact = brandingResult.contact;
    payload.about = collectAbout(aboutSection);
    payload.mobileCoffeeBar = collectMobile(mobileSection);
    payload.dessertCatalog = collectDesserts(dessertSection);

    hiddenInput.value = JSON.stringify(payload);
    form.submit();
  }

  function init() {
    renderBranding(document.querySelector('[data-editor="branding"]'), state);
    renderAbout(document.querySelector('[data-editor="about"]'), state);
    renderMobile(document.querySelector('[data-editor="mobile"]'), state);
    renderDesserts(document.querySelector('[data-editor="desserts"]'), state);

    form.addEventListener('submit', handleSubmit);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
