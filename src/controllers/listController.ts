import { Request, Response } from "express";
import { getUserSupabaseClient } from "@/database/database";
import { ListService } from "@/services/listService";

export const getAllLists = async (req: Request, res: Response) => {
  const listService = new ListService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await listService.getAllLists(supabase);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting lists:", error.message);
    return res.status(500).json({ error: "Error getting lists" });
  }
};
