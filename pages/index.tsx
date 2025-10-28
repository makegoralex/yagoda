import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import { SiteData } from '../lib/types';
import { readSiteData } from '../lib/siteData';

interface HomePageProps {
  siteData: SiteData;
}

export default function HomePage({ siteData }: HomePageProps) {
  const { about, contact } = siteData;

  return (
    <Layout siteData={siteData} title="Наша кофейня" description={about.intro}>
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <h1>{about.intro}</h1>
            <p>{about.description}</p>
            <div className="hero-cta">
              <a className="button" href={`https://yandex.ru/maps/?text=${encodeURIComponent(contact.address)}`} target="_blank" rel="noreferrer">
                Проложить маршрут
              </a>
              <a className="ghost" href={`tel:${contact.phone}`}>Позвонить нам</a>
            </div>
          </div>
          <div className="hero-info">
            <div className="info-card">
              <h3>Адрес</h3>
              <p>{contact.address}</p>
            </div>
            <div className="info-card">
              <h3>Время работы</h3>
              <p>{contact.hours}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="container">
          <h2>Почему стоит зайти</h2>
          <div className="highlight-grid">
            {about.highlights.map((item) => (
              <div key={item} className="highlight-card">
                <span>☕</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="photos">
        <div className="container">
          <h2>Атмосфера</h2>
          <div className="photo-grid">
            {about.photos.map((photo) => (
              <div key={photo.id} className="photo-slot">
                {photo.url ? (
                  <img src={photo.url} alt={photo.title} />
                ) : (
                  <div className="placeholder">
                    <span>{photo.title}</span>
                    <small>Фото появится позже</small>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="visit">
        <div className="container visit-grid">
          <div>
            <h2>Заходите в гости</h2>
            <p>Попробуйте наш кофе и десерты в кофейне, обсудите сотрудничество и выездные форматы. Мы всегда рады новым идеям.</p>
            <p className="muted">Можно написать нам в соцсетях или просто подойти к бару — подскажем и расскажем всё о десертах и выездных барах.</p>
          </div>
          <div className="card">
            <h3>Контакты</h3>
            <p>Телефон: <a href={`tel:${contact.phone}`}>{contact.phone}</a></p>
            <p>E-mail: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
            {contact.instagram && (
              <p>Instagram: <a href={contact.instagram} target="_blank" rel="noreferrer">{contact.instagram}</a></p>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }
        .hero {
          background: linear-gradient(135deg, var(--secondary), #ffffff);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .hero .container {
          display: grid;
          gap: 2.5rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          align-items: center;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-family: var(--font-heading);
        }
        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          font-family: var(--font-heading);
        }
        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }
        .button {
          background-color: var(--primary);
          color: #fff;
          padding: 0.75rem 1.5rem;
          border-radius: 999px;
          font-weight: 600;
        }
        .ghost {
          padding: 0.75rem 1.5rem;
          border-radius: 999px;
          border: 1px solid var(--primary);
          color: var(--primary);
          font-weight: 600;
        }
        .hero-info {
          display: grid;
          gap: 1rem;
        }
        .info-card {
          background-color: #fff;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }
        .highlights {
          background-color: #fff;
        }
        .highlight-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        .highlight-card {
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 1rem;
          padding: 1.25rem;
          background-color: var(--secondary);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .highlight-card span {
          font-size: 1.5rem;
        }
        .photos {
          background-color: #faf7f3;
        }
        .photo-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
        .photo-slot {
          border-radius: 1.2rem;
          overflow: hidden;
          min-height: 220px;
          border: 1px dashed rgba(0, 0, 0, 0.1);
          background-color: #fff;
          display: flex;
        }
        .photo-slot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .placeholder {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          color: rgba(0, 0, 0, 0.6);
          padding: 1rem;
          text-align: center;
          background: repeating-linear-gradient(135deg, rgba(108, 46, 106, 0.05), rgba(108, 46, 106, 0.05) 10px, rgba(0, 0, 0, 0.03) 10px, rgba(0, 0, 0, 0.03) 20px);
        }
        .placeholder span {
          font-weight: 600;
          margin-bottom: 0.3rem;
        }
        .visit {
          background-color: #fff;
        }
        .visit-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
        .muted {
          color: rgba(0, 0, 0, 0.6);
        }
        .card {
          border-radius: 1rem;
          padding: 1.5rem;
          background-color: var(--secondary);
        }
        .card a {
          text-decoration: underline;
        }
      `}</style>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const siteData = await readSiteData();
  return { props: { siteData } };
};
