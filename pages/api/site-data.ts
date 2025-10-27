import type { NextApiRequest, NextApiResponse } from 'next';
import { readSiteData, writeSiteData } from '../../lib/siteData';
import { SiteData } from '../../lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const siteData = await readSiteData();
    return res.status(200).json(siteData);
  }

  if (req.method === 'PUT') {
    try {
      const payload = req.body as SiteData;
      await writeSiteData(payload);
      const siteData = await readSiteData();
      return res.status(200).json(siteData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Не удалось сохранить данные' });
    }
  }

  return res.status(405).json({ message: 'Метод не поддерживается' });
}
