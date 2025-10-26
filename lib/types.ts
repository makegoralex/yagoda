export interface Branding {
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface ContactInfo {
  address: string;
  hours: string;
  phone: string;
  email: string;
  instagram?: string;
}

export interface PhotoSlot {
  id: string;
  title: string;
  url: string;
}

export interface AboutSection {
  intro: string;
  description: string;
  highlights: string[];
  photos: PhotoSlot[];
}

export interface PricingExample {
  id: string;
  title: string;
  price: string;
  description: string;
}

export interface MobileCoffeeBarSection {
  headline: string;
  subheadline: string;
  description: string;
  services: string[];
  requirements: string[];
  pricingExamples: PricingExample[];
  extras: string[];
  cta: string;
}

export interface DessertItem {
  id: string;
  name: string;
  description: string;
  portion: string;
  priceFrom: string;
  image: string;
}

export interface DessertCatalogSection {
  intro: string;
  minimumOrder: string;
  delivery: string;
  items: DessertItem[];
}

export interface SiteData {
  branding: Branding;
  contact: ContactInfo;
  about: AboutSection;
  mobileCoffeeBar: MobileCoffeeBarSection;
  dessertCatalog: DessertCatalogSection;
}
