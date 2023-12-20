import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function PUT(request, response) {
  try {
    const { title, message } = await request.json();

    const { postId } = response.params;

    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        message: message,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request, response) {
  try {
    const { postId } = response.params;

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({ success: true, post: deletedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
