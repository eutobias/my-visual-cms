import { PrismaClient } from '@prisma/client';
import { generateSlug } from '@/lib/generateSlug';

const prisma = new PrismaClient();

export interface CreatePageInput {
  name: string;
  slug?: string;
  displayName: string;
  showInMenu?: boolean;
  enabled?: boolean;
  blocks?: string[];
}

export interface UpdatePageInput {
  name?: string;
  slug?: string;
  displayName?: string;
  showInMenu?: boolean;
  enabled?: boolean;
  blocks?: string[];
}

export const pageService = {
  async create(data: CreatePageInput) {
    const slug = generateSlug(data.name);
    
    return prisma.page.create({
      data: {
        ...data,
        slug,
        blocks: data.blocks ? {
          connect: data.blocks.map(id => ({ id }))
        } : undefined
      },
      include: {
        blocks: true,
      },
    });
  },

  async update(id: string, data: UpdatePageInput) {
    const updateData = { ...data };
    if (data.name) {
      updateData.slug = generateSlug(data.name);
    }

    return prisma.page.update({
      where: { id },
      data: {
        ...updateData,
        blocks: data.blocks ? {
          set: data.blocks.map(id => ({ id }))
        } : undefined
      },
      include: {
        blocks: true,
      },
    });
  },

  async findAll() {
    return prisma.page.findMany({
      include: {
        blocks: true,
      },
    });
  },

  async findById(id: string) {
    return prisma.page.findUnique({
      where: { id },
      include: {
        blocks: true,
      },
    });
  },

  async findBySlug(slug: string) {
    return prisma.page.findUnique({
      where: { slug },
      include: {
        blocks: true,
      },
    });
  },

  async delete(id: string) {
    return prisma.page.delete({
      where: { id },
    });
  },
};