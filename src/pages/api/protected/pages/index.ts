import { NextApiResponse } from 'next';
import { pageService } from '@/services/pageService';
import { withAuth, AuthenticatedRequest } from '@/middleware/authMiddleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        const page = await pageService.create(req.body);
        res.status(201).json(page);
      } catch (error) {
        res.status(400).json({ error: 'Unable to create page' });
      }
      break;

    case 'GET':
      try {
        const pages = await pageService.findAll();
        res.status(200).json(pages);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch pages' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);