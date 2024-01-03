import { prisma } from "@/lib/prisma.js";
import { FaUserCircle } from "react-icons/fa";
import CommentContent from "./CommentContent.jsx";
import Replies from "./Replies.jsx";

export default async function FirstTierComments({
  comment,
  votes,
  user,
  subredditId,
}) {
  let checkUser;

  const replies = await prisma.post.findMany({
    where: {
      parentId: comment.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (user.id) {
    checkUser = await prisma.vote.findFirst({
      where: {
        postId: comment.id,
        userId: user.id,
      },
    });
  }

  return (
    <div className="comment-reply">
      <h5>
        <FaUserCircle className="comment-icon" />
        {comment.user.username}
      </h5>

      <CommentContent
        user={user}
        votes={votes}
        post={comment}
        checkUser={checkUser}
        subredditId={subredditId}
      />

      {replies.map((reply) => (
        <Replies
          reply={reply}
          key={reply.id}
          votes={votes}
          user={user}
          subredditId={subredditId}
        />
      ))}
    </div>
  );
}
