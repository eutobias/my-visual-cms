import { NextApiRequest, NextApiResponse } from "next";
import { blockService } from "@/services/blockService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const block = await blockService.findById(id);
    if (!block) {
      return res.status(404).json({ error: "Block not found" });
    }
    res.status(200).json(block);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch block" });
  }
}
