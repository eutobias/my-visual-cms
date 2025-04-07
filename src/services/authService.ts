import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || '123456';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '654321';

export interface SignInInput {
  email: string;
  password: string;
}

export const authService = {
  async signIn(data: SignInInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Store tokens in database
    await prisma.token.create({
      data: {
        userId: user.id,
        accessToken,
        refreshToken,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  },

  async signOut(userId: string) {
    // Remove all tokens for the user
    await prisma.token.deleteMany({
      where: { userId },
    });
  },

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: string };
      
      const token = await prisma.token.findFirst({
        where: {
          userId: decoded.userId,
          refreshToken,
        },
        include: {
          user: true,
        },
      });

      if (!token) {
        throw new Error('Invalid refresh token');
      }

      const newAccessToken = jwt.sign(
        { userId: token.user.id, email: token.user.email },
        JWT_SECRET,
        { expiresIn: '15m' }
      );

      const newRefreshToken = jwt.sign(
        { userId: token.user.id },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      // Update tokens in database
      await prisma.token.update({
        where: { id: token.id },
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  },

  async validateToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    } catch (error) {
      throw new Error('Invalid token');
    }
  },
};