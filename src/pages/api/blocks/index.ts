import { NextApiRequest, NextApiResponse } from 'next';
import { blockService } from '@/services/blockService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const blocks = await blockService.findAll();
    res.status(200).json(blocks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch blocks' });
  }
}