import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { cookies } from "next/headers.js";
import { NextResponse } from "next/server.js";

export async function POST(request, response) {
  try {
    const { postId, isUpvote } = await request.json();
    const { id } = await fetchUser();

    let vote;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "You must login to like or dislike a post",
      });
    }

    if (!postId) {
      return NextResponse.json({
        success: false,
        error: "The id of post was not provided",
      });
    }

    if (typeof isUpvote !== "boolean") {
      return NextResponse.json({
        success: false,
        error: "Must provide the boolean value for isUpvote",
      });
    }

    const searchVote = await prisma.vote.findFirst({
      where: {
        userId: id,
        postId,
      },
    });

    if (searchVote) {
      vote = await prisma.vote.update({
        where: {
          userId: id,
          postId,
        },
        data: {
          isUpvote: isUpvote,
        },
      });
    } else {
      vote = await prisma.vote.create({
        data: {
          userId: id,
          postId,
          isUpvote: isUpvote,
        },
      });
    }

    return NextResponse.json({ success: true, vote });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
