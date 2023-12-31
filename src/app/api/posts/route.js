import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function POST(request, response) {
  try {
    const { title, message, subredditId, parentId } = await request.json();

    if (!message) {
      return NextResponse.json({
        success: false,
        error: "You did not provide a message to post",
      });
    }

    if (!subredditId) {
      return NextResponse.json({
        success: false,
        error: "You did not provide a subreddit to post to",
      });
    }

    const user = await fetchUser();

    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "You must login to post!",
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        message,
        parentId,
        userId: user.id,
        subredditId,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
