import Link from 'next/link';
import { useRouter } from 'next/router';
import { SiteData } from '../lib/types';

interface HeaderProps {
  siteData: SiteData;
}

const navLinks = [
  { href: '/', label: 'Кофейня' },
  { href: '/mobile-bar', label: 'Выездной бар' },
  { href: '/desserts', label: 'Десерты' },
  { href: '/admin', label: 'Админка' }
];

export default function Header({ siteData }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="brand">
          <Link href="/">
            <span className="brand-name">{siteData.branding.name}</span>
          </Link>
          <span className="brand-tagline">{siteData.branding.tagline}</span>
        </div>
        <nav className="nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={router.pathname === link.href ? 'active' : ''}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <style jsx>{`
        .site-header {
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          background-color: var(--background);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1.2rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .brand {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .brand-name {
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--primary);
        }
        .brand-tagline {
          font-size: 0.95rem;
          color: rgba(0, 0, 0, 0.6);
        }
        .nav {
          display: flex;
          gap: 1rem;
          font-weight: 500;
        }
        .nav a {
          padding: 0.4rem 0.75rem;
          border-radius: 999px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .nav a:hover,
        .nav a.active {
          background-color: var(--primary);
          color: #fff;
        }
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            align-items: flex-start;
          }
          .nav {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </header>
  );
}
