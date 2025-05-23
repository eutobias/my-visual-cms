import { NextApiRequest, NextApiResponse } from 'next';
import { pageService } from '@/services/pageService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pages = await pageService.findAll();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch pages' });
  }
}