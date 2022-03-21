import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (req.method === "PATCH") {
    const { channelId } = req.body;
    try {
      // connect to user
      await prisma.user.update({
        where: { email: session.user.email },
        data: {
          channels: {
            connect: { id: channelId },
          },
        },
      });

      console.log("user added successfully");

      res.status(200).json({ message: "updated user" });
    } catch (error) {
      res.status(500).json({ message: "failed to add user to channel" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
