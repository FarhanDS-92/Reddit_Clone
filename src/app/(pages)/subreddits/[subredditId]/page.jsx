import ShowLikesComments from "@/components/ShowLikesComments.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default async function chosenSubReddit({ params }) {
  const { subredditId } = params;
  const votes = await prisma.vote.findMany();
  const user = await fetchUser();

  const subreddit = await prisma.subReddit.findFirst({
    where: {
      id: subredditId,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      subredditId: subredditId,
      parentId: null,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section
      id="theSubReddit"
      aria-label={`Subreddit Page Of ${subreddit.name}`}
      role="region"
    >
      <h1 id="h1TheSubReddit">
        <FaReddit id="h1SubredditIcon" />
        r/ {subreddit.name}
      </h1>

      <Link id="createPost" href={"/createPost"}>
        <FaReddit id="createPostIcon" />
        <input type="text" placeholder="Create a post" id="createPostInput" />
      </Link>

      {posts.map((post) => (
        <div className="manyPosts" key={post.id}>
          <Link href={`/subreddits/${subredditId}/${post.id}`}>
            <div className="postContent">
              <h5>
                <FaUserCircle id="circleIcon" /> Posted by u/
                {post.user.username}
              </h5>
              <h2>{post.title}</h2>
              <p id="subRedditPostMessage">{post.message}</p>
            </div>
          </Link>

          <ShowLikesComments
            post={post}
            votes={votes}
            user={user}
            subredditId={subredditId}
          />
        </div>
      ))}
    </section>
  );
}
