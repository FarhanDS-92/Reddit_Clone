"use client";

import { useRouter } from "next/navigation.js";
import { RiDeleteBinLine } from "react-icons/ri";

export default function DeleteBtn({ post }) {
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <div className="delete" onClick={handleDelete}>
      <RiDeleteBinLine className="icons" />
      Delete
    </div>
  );
}
