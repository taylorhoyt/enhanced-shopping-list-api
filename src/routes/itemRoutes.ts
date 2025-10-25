import { Router } from "express";
import { getAllItems, getItemById, getItemsByCategory } from "@/controllers/itemController";
import { authenticateUser } from "@/middleware/auth";

const router = Router();

router.get("/", authenticateUser, getAllItems);
router.get("/:id", authenticateUser, getItemById);
router.get("/category/:category", authenticateUser, getItemsByCategory);

export default router;
