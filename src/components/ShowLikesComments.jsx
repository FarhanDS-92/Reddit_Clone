import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { FaRegCommentAlt } from "react-icons/fa";
import InteractiveLikes from "./InteractiveLikes.jsx";
import { getNumberOfVotes } from "@/lib/getNumberOfVotes.js";
import { getNumberOfComments } from "@/lib/getNumberOfComments.js";

export default async function ShowLikesComments({
  votes,
  post,
  user,
  subredditId,
}) {
  let checkUser;

  if (user.id) {
    checkUser = await prisma.vote.findFirst({
      where: {
        postId: post.id,
        userId: user.id,
      },
    });
  }

  const getVotes = getNumberOfVotes(post.id, votes);
  const getComments = getNumberOfComments(post.id);

  return (
    <>
      <div className="likesComments">
        <InteractiveLikes
          votes={getVotes}
          post={post}
          user={user}
          checkUser={checkUser}
        />
        <Link href={`/subreddits/${subredditId}/${post.id}`}>
          <div className="comments">
            <FaRegCommentAlt />
            <p>{getComments}</p>
            <p>Comments</p>
          </div>
        </Link>
      </div>
    </>
  );
}
