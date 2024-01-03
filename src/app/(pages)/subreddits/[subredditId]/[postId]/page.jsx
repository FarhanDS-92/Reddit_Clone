import CreateComment from "@/components/CreateComment.jsx";
import DisplayMainPost from "@/components/DisplayMainPost.jsx";
import FirstTierComments from "@/components/FirstTierComments.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";

export default async function postWithComments({ params }) {
  const { subredditId, postId } = params;

  const votes = await prisma.vote.findMany();
  const user = await fetchUser();

  const mainPost = await prisma.post.findFirst({
    where: {
      id: postId,
      parentId: null,
    },
    include: {
      user: true,
      subreddit: true,
      children: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  delete mainPost.user.password;

  let checkUser;
  if (user.id) {
    checkUser = await prisma.vote.findFirst({
      where: {
        postId: postId,
        userId: user.id,
      },
    });
  }

  return (
    <section
      id="display-posts-comments-section"
      aria-label={`The post and its replies`}
      role="region"
    >
      <Link href={`/subreddits/${subredditId}`} id="display-posts-comments-h1">
        <h1 id="h1TheSubReddit">
          <FaReddit id="h1SubredditIcon" />
          r/ {mainPost.subreddit.name}
        </h1>
      </Link>

      <DisplayMainPost
        post={mainPost}
        user={user}
        votes={votes}
        subreddit={mainPost.subreddit}
        checkUser={checkUser}
      />

      <div id="form-comments">
        <CreateComment user={user} post={mainPost} subredditId={subredditId} />

        <hr id="divider-comment" />

        {mainPost.children.map((comment) => (
          <FirstTierComments
            key={comment.id}
            comment={comment}
            votes={votes}
            user={user}
            subredditId={subredditId}
          />
        ))}
      </div>
    </section>
  );
}
