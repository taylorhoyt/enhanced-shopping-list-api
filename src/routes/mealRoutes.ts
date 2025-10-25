import { Router } from "express";   
import { authenticateUser } from "@/middleware/auth";
import { getAllMeals } from "@/controllers/MealController";

const router = Router();

router.get("/", authenticateUser, getAllMeals);

export default router;
