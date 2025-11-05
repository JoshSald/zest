import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== "string") return res.status(400).json({ error: "Invalid user ID" });

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { recipeId, note } = req.body;
  if (!recipeId || typeof note !== "string") {
    return res.status(400).json({ error: "Missing or invalid parameters" });
  }

  try {
    const existingNote = await prisma.userNote.findFirst({
      where: { userId: id, recipeId },
    });

    let result;
    if (existingNote) {
      result = await prisma.userNote.update({
        where: { id: existingNote.id },
         { note, updatedAt: new Date() },
      });
    } else {
      result = await prisma.userNote.create({
         { userId: id, recipeId, note },
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to save note" });
  }
}
