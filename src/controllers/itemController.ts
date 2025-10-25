import { Request, Response } from "express";
import { ItemService } from "@/services/itemService";

const itemService = new ItemService();

export const getAllItems = async (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const data = await itemService.getAllItems(token);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error getting items:", error.message);
    return res.status(500).json({ error: "Error getting items" });
  }
};
