import { prisma } from "@/lib/prisma.js";
import { FaUserCircle } from "react-icons/fa";
import InteractiveLikes from "./InteractiveLikes.jsx";
import ReplyBtn from "./Reply.jsx";
import EditBtn from "./Edit.jsx";
import DeleteBtn from "./Delete.jsx";

export default async function FirstTierComments({ comment, votes, user }) {
  let checkUser;

  const commentOwner = await prisma.user.findFirst({
    where: {
      id: comment.userId,
    },
  });

  function getNumberOfVotes(postId) {
    const votesForPost = votes.filter((vote) => vote.postId === postId);
    let numberOfVotes = 0;
    for (let i = 0; i < votesForPost.length; i++) {
      if (votesForPost[i].isUpvote === true) {
        numberOfVotes += 1;
      } else if (votesForPost[i].isUpvote === false) {
        numberOfVotes -= 1;
      }
    }
    return numberOfVotes;
  }

  if (user.id) {
    checkUser = await prisma.vote.findFirst({
      where: {
        postId: comment.id,
        userId: user.id,
      },
    });
  }

  return (
    <div className="comment">
      <h5>
        <FaUserCircle className="comment-icon" />
        {commentOwner.username}
      </h5>

      <div className="comment-reply">
        <div className="comment-details">
          <p>{comment.message}</p>

          <div className="interactive-btns">
            <InteractiveLikes
              votes={getNumberOfVotes(comment.id)}
              post={comment}
              user={user}
              checkUser={checkUser}
            />

            <ReplyBtn />
            {user.id === comment.userId ? <EditBtn /> : null}
            {user.id === comment.userId ? <DeleteBtn post={comment} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
