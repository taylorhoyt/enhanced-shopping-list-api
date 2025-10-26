import { Request, Response } from "express";
import { getUserSupabaseClient } from "@/database/database";
import { ListService } from "@/services/listService";
import { AddItemToListRequest, CreateListRequest } from "@/types";

export const createList = async (req: Request, res: Response) => {
  const listService = new ListService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await listService.createList(
      supabase,
      req.body as CreateListRequest
    );

    return res.status(201).json(data);
  } catch (error: any) {
    console.error("Error creating list:", error.message);
    return res.status(500).json({ error: "Error creating list" });
  }
};

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

export const updateItemPurchasedState = async (req: Request, res: Response) => {
  const listService = new ListService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await listService.updateItemPurchasedState(supabase, req.params.id, req.params.listItemId, req.body.is_purchased);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error updating item purchased state:", error.message);
    return res.status(500).json({ error: "Error updating item purchased state" });
  }
};

export const updateItemQuantity = async (req: Request, res: Response) => {
  const listService = new ListService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await listService.updateItemQuantity(supabase, req.params.id, req.params.listItemId, req.body.quantity);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error updating item quantity:", error.message);
    return res.status(500).json({ error: "Error updating item quantity" });
  }
};

export const updateItemUnit = async (req: Request, res: Response) => {
  const listService = new ListService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await listService.updateItemUnit(supabase, req.params.id, req.params.listItemId, req.body.unit);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error updating item unit:", error.message);
    return res.status(500).json({ error: "Error updating item unit" });
  }
};

export const addItemToList = async (req: Request, res: Response) => {
  const listService = new ListService();
  try {
    const supabase = getUserSupabaseClient(req.headers.authorization!);
    const data = await listService.addItemToList(supabase, req.params.id, req.body as AddItemToListRequest);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error adding item to list:", error.message);
    return res.status(500).json({ error: "Error adding item to list" });
  }
};