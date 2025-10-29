import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import { SiteData } from '../lib/types';
import { readSiteData } from '../lib/siteData';

interface MobileBarPageProps {
  siteData: SiteData;
}

export default function MobileBarPage({ siteData }: MobileBarPageProps) {
  const { mobileCoffeeBar } = siteData;

  return (
    <Layout siteData={siteData} title="Выездной кофебар" description={mobileCoffeeBar.description}>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>{mobileCoffeeBar.headline}</h1>
            <p className="subheadline">{mobileCoffeeBar.subheadline}</p>
            <p>{mobileCoffeeBar.description}</p>
            <a className="button" href={`mailto:${siteData.contact.email}?subject=${encodeURIComponent('Заявка на выездной кофебар')}`}>
              Запросить предложение
            </a>
          </div>
          <div className="requirements">
            <h3>Что нужно на площадке</h3>
            <ul>
              {mobileCoffeeBar.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2>Что входит</h2>
          <div className="service-grid">
            {mobileCoffeeBar.services.map((service) => (
              <div key={service} className="service-card">
                <h3>☕</h3>
                <p>{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <h2>Примерные пакеты</h2>
          <div className="pricing-grid">
            {mobileCoffeeBar.pricingExamples.map((item) => (
              <div key={item.id} className="pricing-card">
                <h3>{item.title}</h3>
                <p className="price">{item.price}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <p className="note">Итоговая смета рассчитывается индивидуально: количество гостей, длительность, сложность меню и брендирование. Подготовим детальное предложение после обсуждения деталей.</p>
        </div>
      </section>

      <section className="extras">
        <div className="container extras-grid">
          <div>
            <h2>Дополнительно</h2>
            <ul>
              {mobileCoffeeBar.extras.map((extra) => (
                <li key={extra}>{extra}</li>
              ))}
            </ul>
          </div>
          <div className="cta-card">
            <h3>Как обсудить проект</h3>
            <ol>
              <li>Опишите формат события и количество гостей.</li>
              <li>Расскажите, есть ли площадка и доступ к электричеству.</li>
              <li>Мы предложим меню, фуршет и рассчитаем смету.</li>
            </ol>
            <a className="button" href={`https://wa.me/79990000000`} target="_blank" rel="noreferrer">
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-card">
          <h2>{mobileCoffeeBar.cta}</h2>
          <p>Оплата наличными и безналичными способами. Оформим договор и отчётные документы.</p>
          <a className="button" href={`mailto:${siteData.contact.email}?subject=${encodeURIComponent('Выездной кофебар Ягода Coffee')}`}>
            Оставить заявку
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
          background: linear-gradient(120deg, var(--secondary), #ffffff);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
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
        .subheadline {
          font-size: 1.2rem;
          color: rgba(0, 0, 0, 0.7);
          margin-bottom: 1rem;
        }
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1.6rem;
          border-radius: 999px;
          background-color: var(--primary);
          color: #fff;
          font-weight: 600;
          margin-top: 1.5rem;
        }
        .requirements {
          background-color: #fff;
          padding: 1.8rem;
          border-radius: 1.2rem;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
        }
        .requirements ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0 0;
          display: grid;
          gap: 0.7rem;
        }
        .services {
          background-color: #fff;
        }
        .service-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
        .service-card {
          border-radius: 1rem;
          background-color: var(--secondary);
          padding: 1.5rem;
          border: 1px solid rgba(0, 0, 0, 0.05);
          min-height: 160px;
        }
        .service-card h3 {
          margin: 0 0 0.5rem;
        }
        .pricing {
          background-color: #faf7f3;
        }
        .pricing-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
        .pricing-card {
          background-color: #fff;
          border-radius: 1rem;
          padding: 1.8rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .price {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        .note {
          margin-top: 2rem;
          color: rgba(0, 0, 0, 0.6);
        }
        .extras {
          background-color: #fff;
        }
        .extras-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
        .extras-grid ul,
        .extras-grid ol {
          display: grid;
          gap: 0.8rem;
          padding-left: 1.2rem;
        }
        .extras-grid ul {
          list-style: disc;
        }
        .cta-card {
          background-color: var(--secondary);
          border-radius: 1rem;
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cta {
          background: linear-gradient(120deg, rgba(108, 46, 106, 0.85), rgba(226, 83, 74, 0.8));
          color: #fff;
        }
        .cta .container {
          text-align: center;
        }
        .cta .button {
          background-color: #fff;
          color: var(--primary);
        }
      `}</style>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<MobileBarPageProps> = async () => {
  const siteData = await readSiteData();
  return { props: { siteData } };
};
