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

export const getListById = async (req: Request, res: Response) => {
  const listService = new ListService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await listService.getListById(supabase, req.params.id);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting list:", error.message);
    return res.status(500).json({ error: "Error getting list" });
  }
};

export const getListItems = async (req: Request, res: Response) => {
  const listService = new ListService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await listService.getListItems(supabase, req.params.id);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting list items:", error.message);
    return res.status(500).json({ error: "Error getting list items" });
  }
};

export const getListMeals = async (req: Request, res: Response) => {
  const listService = new ListService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await listService.getListMeals(supabase, req.params.id);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting list meals:", error.message);
    return res.status(500).json({ error: "Error getting list meals" });
  }
};