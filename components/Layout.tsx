import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { SiteData } from '../lib/types';

interface LayoutProps {
  siteData: SiteData;
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function Layout({ siteData, title, description, children }: LayoutProps) {
  const pageTitle = title ? `${title} — ${siteData.branding.name}` : siteData.branding.name;
  const pageDescription = description ?? siteData.branding.tagline;

  return (
    <div className="layout" style={{ backgroundColor: siteData.branding.backgroundColor, color: siteData.branding.textColor }}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <style jsx global>{`
        :root {
          --primary: ${siteData.branding.primaryColor};
          --secondary: ${siteData.branding.secondaryColor};
          --accent: ${siteData.branding.accentColor};
          --background: ${siteData.branding.backgroundColor};
          --text: ${siteData.branding.textColor};
        }
      `}</style>
      <Header siteData={siteData} />
      <main>{children}</main>
      <Footer siteData={siteData} />
    </div>
  );
}
