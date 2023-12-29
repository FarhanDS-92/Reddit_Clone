import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function PUT(request, response) {
  try {
    const { title, message } = await request.json();
    const { postId } = response.params;
    const { id } = await fetchUser();

    const searchPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "You must login to edit the post",
      });
    } else if (id !== searchPost.userId) {
      return NextResponse.json({
        success: false,
        error: "You cannot edit someone else's post.",
      });
    }

    let post;

    if (title && message) {
      post = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title: title,
          message: message,
        },
      });
    } else if (title) {
      post = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title: title,
        },
      });
    } else if (message) {
      post = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          message: message,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "To update you must provide the content to update.",
      });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request, response) {
  try {
    const { postId } = response.params;
    const { id } = await fetchUser();

    const searchPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "You must login to delete the post",
      });
    } else if (id !== searchPost.userId) {
      return NextResponse.json({
        success: false,
        error: "You cannot delete someone else's post.",
      });
    }

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
