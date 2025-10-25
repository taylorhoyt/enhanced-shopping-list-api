import { Request, Response } from "express";
import { getUserSupabaseClient } from "@/database/database";
import { MealService } from "@/services/mealService";

export const getAllMeals = async (req: Request, res: Response) => {
  const mealService = new MealService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await mealService.getAllMeals(supabase);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting meals:", error.message);
    return res.status(500).json({ error: "Error getting meals" });
  }
};

export const getMealById = async (req: Request, res: Response) => {
  const mealService = new MealService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await mealService.getMealById(supabase, req.params.id);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting meal:", error.message);
    return res.status(500).json({ error: "Error getting meal" });
  }
};

export const getMealItems = async (req: Request, res: Response) => {
  const mealService = new MealService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await mealService.getMealItems(supabase, req.params.id);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting meal items:", error.message);
    return res.status(500).json({ error: "Error getting meal items" });
  }
};