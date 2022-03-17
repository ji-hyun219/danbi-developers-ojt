import { PrismaClient, User_role } from "@prisma/client";
import { User } from "nexus-prisma";

const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) return;
  User_role.STORE_ADMIN;
  const { email, name, role} = user;
}

main();