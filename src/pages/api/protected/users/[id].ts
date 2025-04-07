import { NextApiResponse } from 'next';
import { userService } from '@/services/userService';
import { withAuth, AuthenticatedRequest } from '@/middleware/authMiddleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const user = await userService.findById(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch user' });
      }
      break;

    case 'PUT':
      try {
        const user = await userService.update(id, req.body);
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ error: 'Unable to update user' });
      }
      break;

    case 'DELETE':
      try {
        await userService.delete(id);
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: 'Unable to delete user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);