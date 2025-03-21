import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all notifications
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notifications.findMany({
      select: {
        notificationId: true,
        userId: true,
        message: true,
        createdAt: true,
        readStatus: true,
      },
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};