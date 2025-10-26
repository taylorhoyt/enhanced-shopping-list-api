import { Router } from "express";
import { authenticateUser } from "@/middleware/auth";
import { addItemToList, createList, getAllLists, getListById, getListItems, getListMeals, updateItemPurchasedState, updateItemQuantity, updateItemUnit } from "@/controllers/ListController";

const router = Router();

router.post("/", authenticateUser, createList);
router.get("/", authenticateUser, getAllLists);
router.get("/:id", authenticateUser, getListById);
router.get("/:id/items", authenticateUser, getListItems);
router.get("/:id/meals", authenticateUser, getListMeals);
router.put("/:id/items/:listItemId/purchased", authenticateUser, updateItemPurchasedState);
router.put("/:id/items/:listItemId/quantity", authenticateUser, updateItemQuantity);
router.put("/:id/items/:listItemId/unit", authenticateUser, updateItemUnit);
router.put("/:id/items", authenticateUser, addItemToList);

export default router;
