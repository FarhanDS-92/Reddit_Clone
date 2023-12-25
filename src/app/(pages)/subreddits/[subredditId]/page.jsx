import ShowLikesComments from "@/components/ShowLikesComments.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default async function subRedditId({ params }) {
  const { subredditId } = params;
  const users = await prisma.user.findMany();
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
    orderBy: {
      createdAt: "desc",
    },
  });

  function getUserName(userId) {
    const postUser = users.filter((user) => user.id === userId);
    return postUser[0].username;
  }

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
          <Link href={`/posts/${post.id}`}>
            <div className="postContent">
              <h5>
                <FaUserCircle id="circleIcon" />
                {getUserName(post.userId)}
              </h5>
              <h2>{post.title}</h2>
              <p id="subRedditPostMessage">{post.message}</p>
            </div>
          </Link>

          <ShowLikesComments post={post} votes={votes} user={user} />
        </div>
      ))}
    </section>
  );
}
