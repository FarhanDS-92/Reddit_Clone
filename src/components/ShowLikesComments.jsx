import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";

export default async function ShowLikesComments({ votes, post }) {
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
        <div className="likes">
          <button>
            <PiArrowFatUp />
          </button>
          <p>{getNumberOfVotes(post.id)}</p>
          <button>
            <PiArrowFatDown />
          </button>
        </div>

        <Link href={`/posts/${post.id}`}>
          <div className="comments">{comments.length}</div>
        </Link>
      </div>
    </>
  );
}
