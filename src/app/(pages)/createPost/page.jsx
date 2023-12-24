import CreateTitledPost from "@/components/CreateTitledPost.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function createPost() {
  const user = await fetchUser();

  const subreddits = await prisma.subReddit.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section id="createPostSection">
      <h1>Create a post</h1>
      <hr />
      <CreateTitledPost checkUser={user.id} subreddits={subreddits} />
    </section>
  );
}
