import CreateComment from "@/components/CreateComment.jsx";
import DisplayMainPost from "@/components/DisplayMainPost.jsx";
import FirstTierComments from "@/components/FirstTierComments.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { FaReddit } from "react-icons/fa";

export default async function postWithComments({ params }) {
  const { subredditId, postId } = params;

  let checkUser;
  const user = await fetchUser();
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

  const subreddit = await prisma.subReddit.findFirst({
    where: {
      id: subredditId,
    },
  });

  const comments = await prisma.post.findMany({
    where: {
      parentId: postId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

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
        <CreateComment user={user} post={mainPost} subredditId={subredditId} />

        <hr id="divider-comment" />

        {comments.map((comment) => (
          <FirstTierComments
            key={comment.id}
            comment={comment}
            votes={votes}
            user={user}
          />
        ))}
      </div>
    </section>
  );
}
