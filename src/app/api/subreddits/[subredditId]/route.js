import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function DELETE(request, response) {
  try {
    const { subredditId } = response.params;

    const deletedSubreddit = await prisma.post.delete({
      where: {
        id: subredditId,
      },
    });

    return NextResponse.json({ success: true, subreddit: deletedSubreddit });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
