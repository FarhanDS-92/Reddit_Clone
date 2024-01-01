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

  const commentOwner = await prisma.user.findFirst({
    where: {
      id: comment.userId,
    },
  });

  const replies = await prisma.post.findMany({
    where: {
      parentId: comment.id,
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
        {commentOwner.username}
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
