import { Router } from "express";
import { authenticateUser } from "@/middleware/auth";
import { getAllLists } from "@/controllers/ListController";

const router = Router();

router.get("/", authenticateUser, getAllLists);

export default router;
