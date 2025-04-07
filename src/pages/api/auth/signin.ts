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
    const result = await authService.signIn(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}