import { Router } from "express";
import { getNotifications } from "../controllers/notificationController";

const router = Router();

// Route to fetch all notifications
router.get("/", getNotifications);

export default router;