import { Router } from "express";
import { authenticateUser } from "@/middleware/auth";
import { createList, getAllLists, getListById, getListItems, getListMeals } from "@/controllers/ListController";

const router = Router();

router.post("/", authenticateUser, createList);
router.get("/", authenticateUser, getAllLists);
router.get("/:id", authenticateUser, getListById);
router.get("/:id/items", authenticateUser, getListItems);
router.get("/:id/meals", authenticateUser, getListMeals);

export default router;
