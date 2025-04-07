import { NextApiRequest, NextApiResponse } from 'next';
import { pageService } from '@/services/pageService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const page = await pageService.findById(id);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch page' });
  }
}