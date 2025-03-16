import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all notifications
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notifications.findMany({
      include: {
        user: {
          select: {
            userId: true,
            username: true, // Assuming you have a username field in your User model
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Order by latest notifications first
      },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};