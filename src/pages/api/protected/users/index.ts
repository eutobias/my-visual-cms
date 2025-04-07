import { NextApiResponse } from 'next';
import { userService } from '@/services/userService';
import { withAuth, AuthenticatedRequest } from '@/middleware/authMiddleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        const user = await userService.create(req.body);
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: 'Unable to create user' });
      }
      break;

    case 'GET':
      try {
        const users = await userService.findAll();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);