import { prisma } from "@/lib/prisma.js";

export default async function subRedditId({ params }) {
  const { subredditId } = params;

  const subreddit = await prisma.subReddit.findFirst({
    where: {
      id: subredditId,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      subRedditId: subredditId,
      parentId: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const votes = await prisma.vote.findMany();

  console.log(posts);
  console.log(votes);
  return (
    <section
      id="theSubReddit"
      aria-label={`Subreddit Page Of ${subreddit.name}`}
      role="region"
    >
      <h1 id="h1TheSubReddit">r/ {subreddit.name}</h1>
    </section>
  );
}
