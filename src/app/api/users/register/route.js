import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import bcrypt from "bcrypt";

export async function POST(request, response) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "You didn't provide a username and password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUsername = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (checkUsername) {
      return NextResponse.json({
        success: false,
        error: "Username already exist",
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    delete user.password;

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
