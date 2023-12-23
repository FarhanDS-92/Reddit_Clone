import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";
import { fetchUser } from "@/lib/fetchUser.js";
import CreateSubreddit from "@/components/CreateSubReddit.jsx";

export default async function Subreddits() {
  const subreddits = await prisma.subReddit.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const user = fetchUser();

  return (
    <section id="subredditSection" aria-label="Subreddit Page" role="region">
      <CreateSubreddit checkUser={user.id} />

      {subreddits.map((subReddit) => {
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
    </section>
  );
}
