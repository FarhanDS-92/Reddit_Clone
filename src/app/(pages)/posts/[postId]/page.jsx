import { prisma } from "@/lib/prisma.js";

export default async function postId({ params }) {
  const { postId } = params;

  const mainPost = await prisma.post.findFirst({
    where: {
      id: postId,
      parentId: null,
    },
  });

  console.log(mainPost);

  return <h1>Post ID</h1>;
}
