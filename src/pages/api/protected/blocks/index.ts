import { NextApiResponse } from 'next';
import { blockService } from '@/services/blockService';
import { withAuth, AuthenticatedRequest } from '@/middleware/authMiddleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        const block = await blockService.create(req.body);
        res.status(201).json(block);
      } catch (error) {
        res.status(400).json({ error: 'Unable to create block' });
      }
      break;

    case 'GET':
      try {
        const blocks = await blockService.findAll();
        res.status(200).json(blocks);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch blocks' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);