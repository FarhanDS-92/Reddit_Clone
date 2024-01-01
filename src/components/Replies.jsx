import { prisma } from "@/lib/prisma.js";
import { FaUserCircle } from "react-icons/fa";
import { IoMdReturnRight } from "react-icons/io";
import CommentContent from "./CommentContent.jsx";

export default async function Replies({ reply, votes, user, subredditId }) {
  const replyOwner = await prisma.user.findFirst({
    where: {
      id: reply.userId,
    },
  });

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
  });

  return (
    <>
      <div className="replies">
        <div className="replies-container">
          <div className="return">
            <IoMdReturnRight />
          </div>

          <div className="reply-content">
            <h5>
              <FaUserCircle className="comment-icon" />
              {replyOwner.username}
            </h5>

            <CommentContent
              user={user}
              votes={votes}
              post={reply}
              checkUser={checkUser}
              subredditId={subredditId}
            />
          </div>
        </div>
        <hr />

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
