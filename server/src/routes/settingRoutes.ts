import { Router } from "express";
import { getNotifications } from "../controllers/settingController";

const router = Router();

// Route to fetch all notifications
router.get("/notifications", getNotifications);

export default router;