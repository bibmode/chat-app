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
        where: { id: channelId },
        select: {
          members: true,
        },
      });

      if (members.length) {
        isUserAMember = await members.filter(
          (member) => member.email === session.user.email
        );
      } else {
        await prisma.channel.update({
          where: { id: channelId },
          data: {
            members: {
              connect: { email: session.user.email },
            },
          },
        });
      }

      // connect to user
      if (!isUserAMember[0]) {
        await prisma.channel.update({
          where: { id: channelId },
          data: {
            members: {
              connect: { email: session.user.email },
            },
          },
        });
      }

      res.status(200).json({ message: "user added successfully", members });
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
