import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const blocks = await prisma.block.findMany({
      include: {
        pages: true,
      },
    });
    res.status(200).json(blocks);
  } catch (error) {
    console.error("Error fetching blocks:", error);
    res.status(500).json({ message: "Error fetching blocks" });
  }
}