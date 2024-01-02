import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { FaUserCircle } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import CreateSubreddit from "@/components/CreateSubReddit.jsx";

export default async function Home() {
  const user = await fetchUser();

  const userPosts = await prisma.post.findMany({
    where: {
      userId: user.id,
      parentId: null,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const userSubreddits = await prisma.subReddit.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const publicPosts = await prisma.post.findMany({
    where: {
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
    <section id="homeSection" aria-label="Homepage" role="region">
      {user.id ? (
        <h1>
          Welcome
          <span id="welcome-user">{user.username}</span>
        </h1>
      ) : (
        <h1>Welcome Stranger</h1>
      )}

      {user.id ? (
        <div className="homeBtns">
          <Link href={"/createPost"}>
            <button id="home-create-post">+ Create Post</button>
          </Link>

          <CreateSubreddit checkUser={user.id} />
        </div>
      ) : null}

      {user.id ? null : (
        <div id="goToLoginRegister">
          <Link href={"/login"}>
            <p className="hyperlink">Want to Login?</p>
          </Link>

          <Link href={"/register"}>
            <p className="hyperlink">Want to join us and register?</p>
          </Link>
        </div>
      )}

      {user.id ? <h2>Your Posts</h2> : null}

      {user.id ? (
        <div id="userPosts">
          {userPosts.map((post) => (
            <Link
              key={post.id}
              href={`/subreddits/${post.subredditId}/${post.id}`}
              className="homePosts"
            >
              <h4>
                <FaUserCircle id="homeIcon" />
                <p>{post.user.username}</p>
              </h4>

              <h3>{post.title}</h3>

              <p>{post.message}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div id="userPosts">
          {publicPosts.map((post) => (
            <Link
              key={post.id}
              href={`/subreddits/${post.subredditId}/${post.id}`}
              className="homePosts"
            >
              <h4>
                <FaUserCircle id="homeIcon" />
                <p>{post.user.username}</p>
              </h4>

              <h3>{post.title}</h3>

              <p>{post.message}</p>
            </Link>
          ))}
        </div>
      )}

      {user.id ? <h2>Your Created Subreddits</h2> : null}

      {user.id ? (
        <div id="userSubreddits">
          {userSubreddits.map((subReddit) => {
            return (
              <Link
                key={subReddit.id}
                href={`/subreddits/${subReddit.id}`}
                className="defaultSubReddit"
              >
                <FaReddit id="subRedditIcon" />
                <p id="subredditPosts">r/ {subReddit.name}</p>
              </Link>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
