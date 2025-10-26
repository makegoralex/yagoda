import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { DessertItem, PhotoSlot, PricingExample, SiteData } from '../lib/types';
import { readSiteData } from '../lib/siteData';
import { GetServerSideProps } from 'next';

interface AdminPageProps {
  siteData: SiteData;
}

export default function AdminPage({ siteData }: AdminPageProps) {
  const [formData, setFormData] = useState<SiteData>(siteData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(siteData);
  }, [siteData]);

  const handleBrandingChange = <K extends keyof SiteData['branding']>(field: K, value: SiteData['branding'][K]) => {
    setFormData((prev) => ({ ...prev, branding: { ...prev.branding, [field]: value } }));
  };

  const handleContactChange = <K extends keyof SiteData['contact']>(field: K, value: SiteData['contact'][K]) => {
    setFormData((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
  };

  const handleAboutChange = <K extends keyof SiteData['about']>(field: K, value: SiteData['about'][K]) => {
    setFormData((prev) => ({ ...prev, about: { ...prev.about, [field]: value } }));
  };

  const handleMobileChange = <K extends keyof SiteData['mobileCoffeeBar']>(
    field: K,
    value: SiteData['mobileCoffeeBar'][K]
  ) => {
    setFormData((prev) => ({ ...prev, mobileCoffeeBar: { ...prev.mobileCoffeeBar, [field]: value } }));
  };

  const handleDessertChange = <K extends keyof SiteData['dessertCatalog']>(
    field: K,
    value: SiteData['dessertCatalog'][K]
  ) => {
    setFormData((prev) => ({ ...prev, dessertCatalog: { ...prev.dessertCatalog, [field]: value } }));
  };

  const handlePhotoUpdate = (id: string, field: keyof PhotoSlot, value: string) => {
    handleAboutChange(
      'photos',
      formData.about.photos.map((photo) => (photo.id === id ? { ...photo, [field]: value } : photo))
    );
  };

  const addPhotoSlot = () => {
    handleAboutChange('photos', [
      ...formData.about.photos,
      { id: `photo-${Date.now()}`, title: 'Новое фото', url: '' }
    ]);
  };

  const removePhotoSlot = (id: string) => {
    handleAboutChange(
      'photos',
      formData.about.photos.filter((photo) => photo.id !== id)
    );
  };

  const updatePricingExample = (id: string, field: keyof PricingExample, value: string) => {
    handleMobileChange(
      'pricingExamples',
      formData.mobileCoffeeBar.pricingExamples.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addPricingExample = () => {
    handleMobileChange('pricingExamples', [
      ...formData.mobileCoffeeBar.pricingExamples,
      { id: `price-${Date.now()}`, title: 'Новый пакет', price: '', description: '' }
    ]);
  };

  const removePricingExample = (id: string) => {
    handleMobileChange(
      'pricingExamples',
      formData.mobileCoffeeBar.pricingExamples.filter((item) => item.id !== id)
    );
  };

  const updateDessertItem = (id: string, field: keyof DessertItem, value: string) => {
    handleDessertChange(
      'items',
      formData.dessertCatalog.items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addDessertItem = () => {
    handleDessertChange('items', [
      ...formData.dessertCatalog.items,
      { id: `dessert-${Date.now()}`, name: 'Новый десерт', description: '', portion: '', priceFrom: '', image: '' }
    ]);
  };

  const removeDessertItem = (id: string) => {
    handleDessertChange(
      'items',
      formData.dessertCatalog.items.filter((item) => item.id !== id)
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch('/api/site-data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Не удалось сохранить данные');
      }

      const updated = (await response.json()) as SiteData;
      setFormData(updated);
      setMessage('Изменения сохранены');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setSaving(false);
    }
  };

  const listToText = (items: string[]) => items.join('\n');
  const textToList = (value: string) =>
    value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

  return (
    <Layout siteData={formData} title="Админка" description="Редактирование контента">
      <section className="admin">
        <div className="container">
          <h1>Админ-панель</h1>
          <p className="hint">Редактируйте тексты, цвета и каталог. После сохранения изменения сразу появятся на сайте.</p>

          <div className="panel">
            <section>
              <h2>Брендинг и цвета</h2>
              <div className="grid">
                <label>
                  Название
                  <input value={formData.branding.name} onChange={(event) => handleBrandingChange('name', event.target.value)} />
                </label>
                <label>
                  Слоган
                  <input value={formData.branding.tagline} onChange={(event) => handleBrandingChange('tagline', event.target.value)} />
                </label>
                <label>
                  Основной цвет
                  <input type="color" value={formData.branding.primaryColor} onChange={(event) => handleBrandingChange('primaryColor', event.target.value)} />
                </label>
                <label>
                  Дополнительный цвет
                  <input type="color" value={formData.branding.secondaryColor} onChange={(event) => handleBrandingChange('secondaryColor', event.target.value)} />
                </label>
                <label>
                  Акцентный цвет
                  <input type="color" value={formData.branding.accentColor} onChange={(event) => handleBrandingChange('accentColor', event.target.value)} />
                </label>
                <label>
                  Цвет фона
                  <input type="color" value={formData.branding.backgroundColor} onChange={(event) => handleBrandingChange('backgroundColor', event.target.value)} />
                </label>
                <label>
                  Цвет текста
                  <input type="color" value={formData.branding.textColor} onChange={(event) => handleBrandingChange('textColor', event.target.value)} />
                </label>
              </div>
            </section>

            <section>
              <h2>Контакты и график</h2>
              <div className="grid">
                <label>
                  Адрес
                  <input value={formData.contact.address} onChange={(event) => handleContactChange('address', event.target.value)} />
                </label>
                <label>
                  Часы работы
                  <input value={formData.contact.hours} onChange={(event) => handleContactChange('hours', event.target.value)} />
                </label>
                <label>
                  Телефон
                  <input value={formData.contact.phone} onChange={(event) => handleContactChange('phone', event.target.value)} />
                </label>
                <label>
                  E-mail
                  <input value={formData.contact.email} onChange={(event) => handleContactChange('email', event.target.value)} />
                </label>
                <label>
                  Instagram
                  <input value={formData.contact.instagram ?? ''} onChange={(event) => handleContactChange('instagram', event.target.value)} />
                </label>
              </div>
            </section>

            <section>
              <h2>Страница кофейни</h2>
              <label>
                Заголовок
                <input value={formData.about.intro} onChange={(event) => handleAboutChange('intro', event.target.value)} />
              </label>
              <label>
                Описание
                <textarea value={formData.about.description} onChange={(event) => handleAboutChange('description', event.target.value)} />
              </label>
              <label>
                Особенности (по строке на пункт)
                <textarea value={listToText(formData.about.highlights)} onChange={(event) => handleAboutChange('highlights', textToList(event.target.value))} />
              </label>

              <div className="photos">
                <div className="photos-header">
                  <h3>Фотогалерея</h3>
                  <button type="button" onClick={addPhotoSlot}>Добавить фото</button>
                </div>
                <div className="photo-grid">
                  {formData.about.photos.map((photo) => (
                    <div key={photo.id} className="photo-card">
                      <label>
                        Подпись
                        <input value={photo.title} onChange={(event) => handlePhotoUpdate(photo.id, 'title', event.target.value)} />
                      </label>
                      <label>
                        URL изображения
                        <input value={photo.url} onChange={(event) => handlePhotoUpdate(photo.id, 'url', event.target.value)} placeholder="https://..." />
                      </label>
                      <button type="button" className="danger" onClick={() => removePhotoSlot(photo.id)}>
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2>Выездной кофебар</h2>
              <label>
                Заголовок
                <input value={formData.mobileCoffeeBar.headline} onChange={(event) => handleMobileChange('headline', event.target.value)} />
              </label>
              <label>
                Подзаголовок
                <input value={formData.mobileCoffeeBar.subheadline} onChange={(event) => handleMobileChange('subheadline', event.target.value)} />
              </label>
              <label>
                Описание
                <textarea value={formData.mobileCoffeeBar.description} onChange={(event) => handleMobileChange('description', event.target.value)} />
              </label>
              <label>
                Услуги (по строке на пункт)
                <textarea value={listToText(formData.mobileCoffeeBar.services)} onChange={(event) => handleMobileChange('services', textToList(event.target.value))} />
              </label>
              <label>
                Требования (по строке на пункт)
                <textarea value={listToText(formData.mobileCoffeeBar.requirements)} onChange={(event) => handleMobileChange('requirements', textToList(event.target.value))} />
              </label>
              <label>
                Дополнительно (по строке на пункт)
                <textarea value={listToText(formData.mobileCoffeeBar.extras)} onChange={(event) => handleMobileChange('extras', textToList(event.target.value))} />
              </label>

              <div className="pricing-section">
                <div className="section-header">
                  <h3>Пакеты</h3>
                  <button type="button" onClick={addPricingExample}>Добавить пакет</button>
                </div>
                <div className="pricing-grid">
                  {formData.mobileCoffeeBar.pricingExamples.map((item) => (
                    <div key={item.id} className="pricing-card">
                      <label>
                        Название
                        <input value={item.title} onChange={(event) => updatePricingExample(item.id, 'title', event.target.value)} />
                      </label>
                      <label>
                        Цена
                        <input value={item.price} onChange={(event) => updatePricingExample(item.id, 'price', event.target.value)} />
                      </label>
                      <label>
                        Описание
                        <textarea value={item.description} onChange={(event) => updatePricingExample(item.id, 'description', event.target.value)} />
                      </label>
                      <button type="button" className="danger" onClick={() => removePricingExample(item.id)}>
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <label>
                Финальный призыв
                <input value={formData.mobileCoffeeBar.cta} onChange={(event) => handleMobileChange('cta', event.target.value)} />
              </label>
            </section>

            <section>
              <h2>Каталог десертов</h2>
              <label>
                Вступление
                <textarea value={formData.dessertCatalog.intro} onChange={(event) => handleDessertChange('intro', event.target.value)} />
              </label>
              <label>
                Минимальный заказ
                <input value={formData.dessertCatalog.minimumOrder} onChange={(event) => handleDessertChange('minimumOrder', event.target.value)} />
              </label>
              <label>
                Доставка
                <input value={formData.dessertCatalog.delivery} onChange={(event) => handleDessertChange('delivery', event.target.value)} />
              </label>

              <div className="desserts">
                <div className="section-header">
                  <h3>Позиции</h3>
                  <button type="button" onClick={addDessertItem}>Добавить десерт</button>
                </div>
                <div className="dessert-grid">
                  {formData.dessertCatalog.items.map((item) => (
                    <div key={item.id} className="dessert-card">
                      <label>
                        Название
                        <input value={item.name} onChange={(event) => updateDessertItem(item.id, 'name', event.target.value)} />
                      </label>
                      <label>
                        Описание
                        <textarea value={item.description} onChange={(event) => updateDessertItem(item.id, 'description', event.target.value)} />
                      </label>
                      <label>
                        Порция
                        <input value={item.portion} onChange={(event) => updateDessertItem(item.id, 'portion', event.target.value)} />
                      </label>
                      <label>
                        Цена от
                        <input value={item.priceFrom} onChange={(event) => updateDessertItem(item.id, 'priceFrom', event.target.value)} />
                      </label>
                      <label>
                        URL изображения
                        <input value={item.image} onChange={(event) => updateDessertItem(item.id, 'image', event.target.value)} placeholder="https://..." />
                      </label>
                      <button type="button" className="danger" onClick={() => removeDessertItem(item.id)}>
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="actions">
            <button type="button" onClick={handleSave} disabled={saving}>
              {saving ? 'Сохраняем…' : 'Сохранить изменения'}
            </button>
            {message && <span className="message">{message}</span>}
            {error && <span className="error">{error}</span>}
          </div>
        </div>
      </section>

      <style jsx>{`
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }
        h1 {
          margin-bottom: 0.5rem;
        }
        .hint {
          color: rgba(0, 0, 0, 0.6);
          margin-bottom: 2rem;
        }
        .panel {
          display: grid;
          gap: 2.5rem;
        }
        section {
          background-color: #fff;
          border-radius: 1.2rem;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }
        h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
        }
        label {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        input,
        textarea,
        button {
          font-family: inherit;
        }
        input,
        textarea {
          border-radius: 0.75rem;
          border: 1px solid rgba(0, 0, 0, 0.12);
          padding: 0.7rem 1rem;
          font-size: 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        input:focus,
        textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(108, 46, 106, 0.15);
        }
        textarea {
          min-height: 120px;
          resize: vertical;
        }
        .grid {
          display: grid;
          gap: 1.2rem;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        .photos {
          margin-top: 1.5rem;
        }
        .photos-header,
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .photo-grid,
        .pricing-grid,
        .dessert-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
        .photo-card,
        .pricing-card,
        .dessert-card {
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 1rem;
          padding: 1.2rem;
          background-color: var(--secondary);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        button {
          cursor: pointer;
          border: none;
          border-radius: 999px;
          padding: 0.7rem 1.4rem;
          background-color: var(--primary);
          color: #fff;
          font-weight: 600;
          transition: transform 0.1s ease;
        }
        button:hover {
          transform: translateY(-1px);
        }
        button:disabled {
          opacity: 0.6;
          cursor: default;
          transform: none;
        }
        .danger {
          background-color: var(--accent);
        }
        .actions {
          margin-top: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .message {
          color: #1f7a36;
          font-weight: 600;
        }
        .error {
          color: #c0392b;
          font-weight: 600;
        }
      `}</style>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<AdminPageProps> = async () => {
  const siteData = await readSiteData();
  return { props: { siteData } };
};
