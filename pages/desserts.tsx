import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import { SiteData } from '../lib/types';
import { readSiteData } from '../lib/siteData';

interface DessertsPageProps {
  siteData: SiteData;
}

export default function DessertsPage({ siteData }: DessertsPageProps) {
  const { dessertCatalog } = siteData;

  return (
    <Layout siteData={siteData} title="Каталог десертов" description={dessertCatalog.intro}>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Десерты от Ягода Coffee</h1>
            <p>{dessertCatalog.intro}</p>
            <p className="note">Для расчёта оптовой цены укажите название кофейни или проекта, примерный объём и желаемые даты поставки.</p>
            <a className="button" href={`mailto:${siteData.contact.email}?subject=${encodeURIComponent('Запрос на десерты Ягода Coffee')}`}>
              Оставить заявку
            </a>
          </div>
          <div className="info-card">
            <h3>Условия</h3>
            <ul>
              <li>{dessertCatalog.minimumOrder}</li>
              <li>{dessertCatalog.delivery}</li>
              <li>Прайс-лист отправим по запросу в письме</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="container">
          <h2>Каталог</h2>
          <div className="grid">
            {dessertCatalog.items.map((item) => (
              <article key={item.id} className="card">
                <div className="image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="placeholder">
                      <span>{item.name}</span>
                      <small>Фото появится позже</small>
                    </div>
                  )}
                </div>
                <div className="content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="meta">Порция: {item.portion}</p>
                  <p className="price">{item.priceFrom}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-content">
          <div>
            <h2>Готовы обсудить поставки?</h2>
            <p>Напишите нам — вышлем актуальный прайс и предложим сезонные позиции. Возможна дегустация в кофейне.</p>
          </div>
          <a className="button" href={`mailto:${siteData.contact.email}?subject=${encodeURIComponent('Прайс на десерты Ягода Coffee')}`}>
            Запросить прайс
          </a>
        </div>
      </section>

      <style jsx>{`
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }
        .hero {
          background: linear-gradient(135deg, var(--secondary), #fff);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .hero-grid {
          display: grid;
          gap: 2.5rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          align-items: start;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 999px;
          background-color: var(--primary);
          color: #fff;
          font-weight: 600;
          margin-top: 1.5rem;
        }
        .note {
          color: rgba(0, 0, 0, 0.65);
        }
        .info-card {
          background-color: #fff;
          border-radius: 1.2rem;
          padding: 1.8rem;
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.06);
        }
        .info-card ul {
          margin: 1rem 0 0;
          padding-left: 1.2rem;
        }
        .catalog {
          background-color: #fff;
        }
        .grid {
          display: grid;
          gap: 1.8rem;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
        .card {
          border-radius: 1.2rem;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.03);
        }
        .image {
          height: 200px;
          background-color: #f8f5f2;
        }
        .image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .placeholder {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          color: rgba(0, 0, 0, 0.6);
          text-align: center;
          padding: 1rem;
          background: repeating-linear-gradient(135deg, rgba(108, 46, 106, 0.08), rgba(108, 46, 106, 0.08) 12px, rgba(226, 83, 74, 0.06) 12px, rgba(226, 83, 74, 0.06) 24px);
        }
        .content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .meta {
          color: rgba(0, 0, 0, 0.6);
          font-size: 0.95rem;
        }
        .price {
          font-weight: 700;
          color: var(--primary);
        }
        .cta {
          background-color: var(--secondary);
        }
        .cta-content {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          align-items: flex-start;
        }
        @media (min-width: 720px) {
          .cta-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<DessertsPageProps> = async () => {
  const siteData = await readSiteData();
  return { props: { siteData } };
};
