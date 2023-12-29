import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { FaRegCommentAlt } from "react-icons/fa";
import InteractiveLikes from "./InteractiveLikes.jsx";

export default async function ShowLikesComments({ votes, post, user }) {
  let checkUser;

  if (user.id) {
    checkUser = await prisma.vote.findFirst({
      where: {
        postId: post.id,
        userId: user.id,
      },
    });
  }

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
        <InteractiveLikes
          votes={getNumberOfVotes(post.id)}
          post={post}
          user={user}
          checkUser={checkUser}
        />
        <Link href={`/posts/${post.id}`}>
          <div className="comments">
            <FaRegCommentAlt />
            <p>Comments</p>
          </div>
        </Link>
      </div>
    </>
  );
}
