import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function POST(request, response) {
  try {
    const { title, message, subredditId, parentId } = await request.json();

    if (!message || !subredditId) {
      return NextResponse.json({
        success: false,
        error: "You did not provide a message and/or a subreddit to post to",
      });
    }

    const { id } = await fetchUser();

    const post = await prisma.post.create({
      data: {
        title,
        message,
        parentId,
        userId: id,
        subredditId,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
