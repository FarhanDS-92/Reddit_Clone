import { prisma } from "@/lib/prisma.js";
import { FaUserCircle } from "react-icons/fa";
import { IoMdReturnRight } from "react-icons/io";
import CommentContent from "./CommentContent.jsx";

export default async function Replies({ reply, votes, user, subredditId }) {
  let checkUser;

  if (user.id) {
    checkUser = await prisma.vote.findFirst({
      where: {
        postId: reply.id,
        userId: user.id,
      },
    });
  }

  const replies = await prisma.post.findMany({
    where: {
      parentId: reply.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="replies">
        <h5>
          <FaUserCircle className="comment-icon" />
          {reply.user.username}
        </h5>
        <div className="replies-container">
          <CommentContent
            user={user}
            votes={votes}
            post={reply}
            checkUser={checkUser}
            subredditId={subredditId}
          />
        </div>

        {replies[0] ? (
          <>
            {replies.map((reply) => (
              <Replies
                reply={reply}
                key={reply.id}
                votes={votes}
                user={user}
                subredditId={subredditId}
              />
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
