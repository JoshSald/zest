import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== "string") return res.status(400).json({ error: "Invalid user ID" });

  const { recipeId, action } = req.body;
  if (!recipeId || !["add", "remove"].includes(action)) {
    return res.status(400).json({ error: "Missing or invalid parameters" });
  }

  try {
    if (action === "add") {
      const favorite = await prisma.userFavorite.create({
         { userId: id, recipeId },
      });
      res.status(200).json(favorite);
    } else {
      await prisma.userFavorite.deleteMany({
        where: { userId: id, recipeId },
      });
      res.status(200).json({ message: "Favorite removed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update favorites" });
  }
}
