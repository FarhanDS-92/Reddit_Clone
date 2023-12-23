import SubredditsComponent from "@/components/SubRedditsComponent.jsx";
import { prisma } from "@/lib/prisma.js";

export default async function Subreddits() {
  const subreddits = await prisma.subReddit.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section id="subredditSection" aria-label="Subreddit Page" role="region">
      <SubredditsComponent subreddits={subreddits} />
    </section>
  );
}
