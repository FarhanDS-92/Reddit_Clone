import CreateComment from "@/components/CreateComment.jsx";
import DisplayMainPost from "@/components/DisplayMainPost.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { FaReddit } from "react-icons/fa";

export default async function postWithComments({ params }) {
  const { postId } = params;
  const votes = await prisma.vote.findMany();

  const mainPost = await prisma.post.findFirst({
    where: {
      id: postId,
      parentId: null,
    },
  });

  const postOwner = await prisma.user.findFirst({
    where: {
      id: mainPost.userId,
    },
  });

  delete postOwner.password;

  const user = await fetchUser();

  const subreddit = await prisma.subReddit.findFirst({
    where: {
      id: mainPost.subRedditId,
    },
  });

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
    <section id="display-posts-comments-section">
      <h1 id="h1TheSubReddit">
        <FaReddit id="h1SubredditIcon" />
        r/ {subreddit.name}
      </h1>

      <DisplayMainPost
        post={mainPost}
        user={user}
        votes={votes}
        subreddit={subreddit}
        checkUser={checkUser}
        postOwner={postOwner}
      />

      <div id="form-comments">
        <CreateComment user={user} post={mainPost} />
      </div>
    </section>
  );
}
