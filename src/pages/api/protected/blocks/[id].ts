import { NextApiResponse } from 'next';
import { blockService } from '@/services/blockService';
import { withAuth, AuthenticatedRequest } from '@/middleware/authMiddleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const block = await blockService.findById(id);
        if (!block) {
          return res.status(404).json({ error: 'Block not found' });
        }
        res.status(200).json(block);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch block' });
      }
      break;

    case 'PUT':
      try {
        const block = await blockService.update(id, req.body);
        res.status(200).json(block);
      } catch (error) {
        res.status(400).json({ error: 'Unable to update block' });
      }
      break;

    case 'DELETE':
      try {
        await blockService.delete(id);
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: 'Unable to delete block' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);