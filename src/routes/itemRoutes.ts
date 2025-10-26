import { Router } from "express";
import { createItem, getAllItems, getItemById, getItemsByCategory, updateItem } from "@/controllers/itemController";
import { authenticateUser } from "@/middleware/auth";

const router = Router();

router.get("/", authenticateUser, getAllItems);
router.get("/:id", authenticateUser, getItemById);
router.get("/category/:category", authenticateUser, getItemsByCategory);
router.post("/", authenticateUser, createItem);
router.put("/:id", authenticateUser, updateItem);

export default router;
