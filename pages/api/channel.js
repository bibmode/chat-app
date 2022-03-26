import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (req.method === "POST") {
    const { userName, description } = req.body;
    try {
      // connect to user
      await prisma.channel.create({
        data: {
          name: userName,
          description,
          members: {
            connect: { email: session.user.email },
          },
        },
      });

      console.log("channel added successfully");

      res.status(200).json({ message: "channel added successfully" });
    } catch (error) {
      res.status(500).json({ message: "failed to create channel" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
