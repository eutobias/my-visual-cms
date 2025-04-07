import { NextApiResponse } from 'next';
import { pageService } from '@/services/pageService';
import { withAuth, AuthenticatedRequest } from '@/middleware/authMiddleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const page = await pageService.findById(id);
        if (!page) {
          return res.status(404).json({ error: 'Page not found' });
        }
        res.status(200).json(page);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch page' });
      }
      break;

    case 'PUT':
      try {
        const page = await pageService.update(id, req.body);
        res.status(200).json(page);
      } catch (error) {
        res.status(400).json({ error: 'Unable to update page' });
      }
      break;

    case 'DELETE':
      try {
        await pageService.delete(id);
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: 'Unable to delete page' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);