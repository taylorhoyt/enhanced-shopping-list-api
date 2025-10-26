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


export const getItemById = async (req: Request, res: Response) => {
  const itemService = new ItemService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await itemService.getItemById(supabase, req.params.id);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting item:", error.message);
    return res.status(500).json({ error: "Error getting item" });
  }
};

export const getItemsByCategory = async (req: Request, res: Response) => {
  const itemService = new ItemService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await itemService.getItemsByCategory(supabase, req.params.category);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting items by category:", error.message);
    return res.status(500).json({ error: "Error getting items by category" });
  }
};

export const createItem = async (req: Request, res: Response) => {
  const itemService = new ItemService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await itemService.createItem(supabase, req.body);

    if (!data) {
      return res.status(400).json({ error: "Failed to create item" });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error creating item:", error.message);
    return res.status(500).json({ error: "Error creating item" });
  }
};