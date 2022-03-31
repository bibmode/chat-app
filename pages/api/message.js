import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (req.method === "POST") {
    const { message, channelId } = req.body;
    try {
      // connect to user
      await prisma.message.create({
        data: {
          message,
          userId: session.userId,
          channelId,
        },
      });

      res.status(200).json({ message: "message added successfully" });
    } catch (error) {
      res.status(500).json({ message: "failed to send message" });
    }
  } else if (req.method === "GET") {
    try {
      const { channelId } = req.query;

      const messages = await prisma.message.findMany({
        where: { channelId },
        include: {
          user: true, // Return all fields
        },
      });

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Can't get user favorites" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
