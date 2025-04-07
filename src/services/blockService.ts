import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateBlockInput {
  name: string;
  content: string;
  shared?: boolean;
  pageIds?: string[]; // Add pageIds for relationship
}

export interface UpdateBlockInput {
  name?: string;
  content?: string;
  shared?: boolean;
  pageIds?: string[]; // Add pageIds for relationship
}

export const blockService = {
  async create(data: CreateBlockInput) {
    const { pageIds, ...blockData } = data;
    return prisma.block.create({
      data: {
        ...blockData,
        pages: pageIds ? {
          connect: pageIds.map(id => ({ id }))
        } : undefined
      },
      include: {
        pages: true
      }
    });
  },

  async findAll() {
    return prisma.block.findMany({
      include: {
        pages: true
      }
    });
  },

  async findById(id: string) {
    return prisma.block.findUnique({
      where: { id },
      include: {
        pages: true
      }
    });
  },

  async update(id: string, data: UpdateBlockInput) {
    const { pageIds, ...blockData } = data;
    return prisma.block.update({
      where: { id },
      data: {
        ...blockData,
        pages: pageIds ? {
          set: pageIds.map(id => ({ id }))
        } : undefined
      },
      include: {
        pages: true
      }
    });
  },

  async delete(id: string) {
    return prisma.block.delete({
      where: { id },
    });
  },
};