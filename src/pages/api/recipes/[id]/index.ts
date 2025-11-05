import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id || typeof id !== "string")
    return res.status(400).json({ error: "Invalid recipe ID" });

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        user: true,
        ingredients: { include: { ingredient: true } },
        favoritedBy: true,
        notes: true,
      },
    });
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
}
