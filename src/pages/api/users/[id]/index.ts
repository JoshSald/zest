import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string")
    return res.status(400).json({ error: "Invalid user ID" });

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        submittedRecipes: true,
        favoriteRecipes: { include: { recipe: true } },
        notes: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      userId: user.id,
      userName: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      joinedDate: user.joinedDate,
      submittedRecipes: user.submittedRecipes,
      favoriteRecipes: user.favoriteRecipes.map(
        (fav: { recipe: any }) => fav.recipe
      ),
      notes: user.notes,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
}
