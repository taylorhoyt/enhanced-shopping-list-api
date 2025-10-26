import { Router } from "express";   
import { authenticateUser } from "@/middleware/auth";
import { createMeal, getAllMeals, getMealById, getMealItems } from "@/controllers/MealController";

const router = Router();

router.get("/", authenticateUser, getAllMeals);
router.get("/:id", authenticateUser, getMealById);
router.get("/:id/items", authenticateUser, getMealItems);
router.post("/", authenticateUser, createMeal);

export default router;
