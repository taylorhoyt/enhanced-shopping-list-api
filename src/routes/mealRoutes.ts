import { Router } from "express";   
import { authenticateUser } from "@/middleware/auth";
import { 
  createMeal, 
  getAllMeals, 
  getMealById, 
  getMealItems,
  updateMealName,
  addItemToMeal,
  removeItemFromMeal,
  updateMealItem
} from "@/controllers/MealController";

const router = Router();

router.get("/", authenticateUser, getAllMeals);
router.get("/:id", authenticateUser, getMealById);
router.get("/:id/items", authenticateUser, getMealItems);
router.post("/", authenticateUser, createMeal);
router.put("/:id/name", authenticateUser, updateMealName);
router.put("/:id/items", authenticateUser, addItemToMeal);
router.delete("/:id/items/:itemId", authenticateUser, removeItemFromMeal);
router.put("/:id/items/:itemId", authenticateUser, updateMealItem);

export default router;
