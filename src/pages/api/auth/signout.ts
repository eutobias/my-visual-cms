import { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '@/services/authService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = await authService.validateToken(token);
    await authService.signOut(decoded.userId);
    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}