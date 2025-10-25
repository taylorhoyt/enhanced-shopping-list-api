import { Request, Response } from "express";
import { ItemService } from "@/services/itemService";
import { getUserSupabaseClient } from "@/database/database";

export const getAllItems = async (req: Request, res: Response) => {
  const itemService = new ItemService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await itemService.getAllItems(supabase);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting items:", error.message);
    return res.status(500).json({ error: "Error getting items" });
  }
};
