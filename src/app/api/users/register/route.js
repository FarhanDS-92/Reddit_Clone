import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request, response) {
  try {
    // cookies , username, password
    const cookieStore = cookies();
    const { username, password } = await request.json();

    // Check for if they provided a username and password
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "You didn't provide a username and password",
      });
    }

    // check for if the provided username is already used
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

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // setting JWT and putting a cookie with that
    const token = jwt.sign(
      { userId: user.id, username },
      process.env.JWT_SECRET
    );
    cookieStore.set("token", token);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
