"use client";

import Link from "next/link.js";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateComment({ post, user, subredditId }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, SetIsLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.id) {
      return setError("You need to login to comment!");
    }

    SetIsLoading(true);

    if (text) {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          message: text,
          subredditId: subredditId,
          parentId: post.id,
        }),
      });
      const data = await res.json();

      if (data.error) {
        SetIsLoading(false);
        return setError(data.error);
      }

      SetIsLoading(false);
      setText("");
      router.refresh();
    } else {
      setError("You need to write a comment to post!");
    }
  }

  return (
    <form id="create-comment-container" onSubmit={handleSubmit}>
      {isLoading ? (
        <span class="loader"></span>
      ) : (
        <>
          <div id="create-comment-text-container">
            <p>
              Comment as
              <Link href={"/"} id="create-comment-user-link">
                {user.username}
              </Link>
            </p>
            <textarea
              id="create-comment-text"
              placeholder="comment here..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
          </div>
          <div id="create-comment-button-container">
            <p id="create-comment-error">{error}</p>
            <button
              type="submit"
              style={{
                color: text ? "white" : "black",
                backgroundColor: text ? "green" : "gray",
                cursor: text ? "pointer" : "not-allowed",
              }}
            >
              Comment
            </button>
          </div>
        </>
      )}
    </form>
  );
}
