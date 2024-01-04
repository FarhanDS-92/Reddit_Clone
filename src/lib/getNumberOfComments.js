import { prisma } from "./prisma.js";

export async function getNumberOfComments(postId) {
  const children = await prisma.post.findMany({
    where: {
      parentId: postId,
    },
    include: {
      children: true,
    },
  });

  let totalComments = children.length;

  for (let child of children) {
    totalComments += await getNumberOfComments(child.id);
  }

  return totalComments;
}
