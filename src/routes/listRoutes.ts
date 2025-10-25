import { Router } from "express";
import { authenticateUser } from "@/middleware/auth";
import { getAllLists } from "@/controllers/ListController";
import { getListById } from "@/controllers/ListController";
import { getListItems } from "@/controllers/ListController";
import { getListMeals } from "@/controllers/ListController";

const router = Router();

router.get("/", authenticateUser, getAllLists);
router.get("/:id", authenticateUser, getListById);
router.get("/:id/items", authenticateUser, getListItems);
router.get("/:id/meals", authenticateUser, getListMeals);
export default router;
