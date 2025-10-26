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

export const createMeal = async (req: Request, res: Response) => {
  const mealService = new MealService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await mealService.createMeal(supabase, req.body);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error creating meal:", error.message);
    return res.status(500).json({ error: "Error creating meal" });
  }
};

export const updateMealName = async (req: Request, res: Response) => {
  const mealService = new MealService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const data = await mealService.updateMealName(supabase, req.params.id, name);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error updating meal name:", error.message);
    return res.status(500).json({ error: "Error updating meal name" });
  }
};

export const addItemToMeal = async (req: Request, res: Response) => {
  const mealService = new MealService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const mealId = req.params.id;
    const { item_id, quantity, unit } = req.body;

    if (!item_id || !quantity) {
      return res.status(400).json({ error: "item_id and quantity are required" });
    }

    const data = await mealService.addItemToMeal(
      supabase,
      mealId,
      { item_id, quantity, unit }
    );

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error adding item to meal:", error.message);
    return res.status(500).json({ error: "Error adding item to meal" });
  }
};

export const removeItemFromMeal = async (req: Request, res: Response) => {
  const mealService = new MealService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const mealId = req.params.id;
    const itemId = req.params.itemId;

    const data = await mealService.removeItemFromMeal(supabase, mealId, itemId);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error removing item from meal:", error.message);
    return res.status(500).json({ error: "Error removing item from meal" });
  }
};

export const updateMealItem = async (req: Request, res: Response) => {
  const mealService = new MealService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const mealId = req.params.id;
    const itemId = req.params.itemId;
    const { quantity, unit } = req.body;

    if (!quantity) {
      return res.status(400).json({ error: "quantity is required" });
    }

    const data = await mealService.updateMealItem(
      supabase,
      mealId,
      itemId,
      { quantity, unit }
    );

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error updating meal item:", error.message);
    return res.status(500).json({ error: "Error updating meal item" });
  }
};

