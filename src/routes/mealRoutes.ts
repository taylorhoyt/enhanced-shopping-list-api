import { Router } from "express";   
import { authenticateUser } from "@/middleware/auth";
import { getAllMeals, getMealById, getMealItems } from "@/controllers/MealController";

const router = Router();

router.get("/", authenticateUser, getAllMeals);
router.get("/:id", authenticateUser, getMealById);
router.get("/:id/items", authenticateUser, getMealItems);

export default router;
