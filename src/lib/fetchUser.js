import jwt from "jsonwebtoken";
import { cookies } from "next/headers.js";
import { prisma } from "./prisma.js";

export async function fetchUser() {
  try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get("token");

    if (!userCookie) {
      return {};
    }

    const decodedToken = jwt.verify(userCookie.value, process.env.JWT_SECRET);
    const { userId } = decodedToken;

    const user = await prisma.user.findFirst({ where: { id: userId } });
    delete user.password;

    return user;
  } catch (error) {
    return {};
  }
}
