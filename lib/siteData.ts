import fs from 'fs/promises';
import path from 'path';
import { SiteData } from './types';

const dataPath = path.join(process.cwd(), 'data', 'siteData.json');

export async function readSiteData(): Promise<SiteData> {
  const raw = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(raw) as SiteData;
}

export async function writeSiteData(data: SiteData): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}
