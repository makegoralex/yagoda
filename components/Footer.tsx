import { SiteData } from '../lib/types';

interface FooterProps {
  siteData: SiteData;
}

export default function Footer({ siteData }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <h4>{siteData.branding.name}</h4>
          <p>{siteData.contact.address}</p>
          <p>{siteData.contact.hours}</p>
        </div>
        <div>
          <p>Телефон: <a href={`tel:${siteData.contact.phone}`}>{siteData.contact.phone}</a></p>
          <p>E-mail: <a href={`mailto:${siteData.contact.email}`}>{siteData.contact.email}</a></p>
          {siteData.contact.instagram && (
            <p>
              Instagram: <a href={siteData.contact.instagram} target="_blank" rel="noreferrer">{siteData.contact.instagram}</a>
            </p>
          )}
        </div>
        <div className="cta">
          <p>Забегайте в кофейню, чтобы познакомиться и попробовать напитки.</p>
          <a className="cta-button" href="https://yandex.ru/maps" target="_blank" rel="noreferrer">
            Построить маршрут
          </a>
        </div>
      </div>
      <style jsx>{`
        .site-footer {
          background-color: var(--primary);
          color: #fff;
          padding: 2.5rem 1.5rem;
          margin-top: 4rem;
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        h4 {
          margin: 0 0 0.75rem;
          font-size: 1.2rem;
        }
        p {
          margin: 0.4rem 0;
        }
        a {
          color: #fff;
          text-decoration: underline;
        }
        .cta {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          color: var(--primary);
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          font-weight: 600;
        }
      `}</style>
    </footer>
  );
}
