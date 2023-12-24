import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import InteractiveLikesOnParent from "./InteractiveLikesOnParent.jsx";
import { FaRegCommentAlt } from "react-icons/fa";

export default async function ShowLikesComments({ votes, post, user }) {
  const comments = await prisma.post.findMany({
    where: {
      parentId: post.id,
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

  return (
    <>
      <div className="likesComments">
        <InteractiveLikesOnParent
          votes={getNumberOfVotes(post.id)}
          post={post}
          user={user}
        />
        <Link href={`/posts/${post.id}`}>
          <div className="comments">
            <FaRegCommentAlt />
            {comments.length}
            <p>Comments</p>
          </div>
        </Link>
      </div>
    </>
  );
}
