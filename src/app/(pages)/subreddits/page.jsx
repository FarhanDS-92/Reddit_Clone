import { prisma } from "@/lib/prisma.js";

export default async function Subreddits() {
  const subreddits = await prisma.subReddit.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(subreddits);
  return (
    <section id="subredditSection" aria-label="Subreddit Page" role="region">
      <button id="createSubreddit">+ Create A Subreddit</button>
      {subreddits.map((subReddit) => {
        return (
          <div key={subReddit.id} className="defaultSubReddit">
            {subReddit.name}
          </div>
        );
      })}
    </section>
  );
}
