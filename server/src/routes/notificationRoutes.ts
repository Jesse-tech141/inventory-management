import { Router } from "express";
import { getNotifications } from "../controllers/notificationController";

const router = Router();

// Route to get all notifications
router.get("/notifications", getNotifications);

export default router;