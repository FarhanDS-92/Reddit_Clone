import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { cookies } from "next/headers.js";
import { NextResponse } from "next/server.js";

export async function POST(request, response) {
  try {
    const { postId, isUpvote } = await request.json();

    const user = await fetchUser();

    const cookieStore = cookies();

    const vote = await prisma.vote.findFirst({
      where: {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
