import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (req.method === "PATCH") {
    const { channelId } = req.body;
    let isUserAMember;
    try {
      // check if channel already has user
      const { members } = await prisma.channel.findFirst({
        select: {
          members: true,
        },
      });

      if (members.length) {
        isUserAMember = [
          ...members.map((member) => {
            if (member.email === session.user.email) return true;
          }),
        ];
      }

      // connect to user
      if (!isUserAMember) {
        await prisma.channel.update({
          where: { id: channelId },
          data: {
            channels: {
              connect: { email: session.user.email },
            },
          },
        });

        res.status(200).json({ message: "updated user" });
      }

      res.status(200).json({ message: "user already exists" });
    } catch (error) {
      res.status(500).json({ message: "failed to add user to channel" });
    }
  } else if (req.method === "GET") {
    try {
      const { userId } = req.query;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Can't find user" });
    }
  } else {
    res.setHeader("Allow", ["PATCH", "GET"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
