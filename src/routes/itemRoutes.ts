import { Router } from "express";
import { getAllItems } from "@/controllers/itemController";
import { authenticateUser } from "@/middleware/auth";

const router = Router();

router.get("/", authenticateUser, getAllItems);

export default router;
