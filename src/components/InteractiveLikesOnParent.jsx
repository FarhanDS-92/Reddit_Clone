"use client";

import { useState } from "react";
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";

export default function InteractiveLikesOnParent({ votes, post, user }) {
  const [likes, setLikes] = useState(votes);
  const [isUpVote, setIsUpVote] = useState(null);
  const [error, setError] = useState("");

  async function handlePlus() {
    if (user.id) {
      if (!isUpVote) {
        await fetch("/api/votes", {
          method: "POST",
          body: JSON.stringify({
            postId: post.id,
            isUpvote: true,
          }),
        });
        const x = votes + 1;
        setLikes(x);
        setIsUpVote(true);
      }
    } else {
      setError("You need to login to Upvote!");
    }
  }

  async function handleMinus() {
    if (user.id) {
      if (isUpVote === null || isUpVote === true) {
        await fetch("/api/votes", {
          method: "POST",
          body: JSON.stringify({
            postId: post.id,
            isUpvote: false,
          }),
        });
        const x = votes - 1;
        setLikes(x);
        setIsUpVote(false);
      }
    } else {
      setError("You need to login to Down-vote!");
    }
  }

  return (
    <>
      <div className="likes">
        <button
          onClick={handlePlus}
          style={{
            color: isUpVote ? "#FF4500" : "black",
          }}
        >
          {isUpVote ? <PiArrowFatUpFill /> : <PiArrowFatUp />}
        </button>

        <p
          style={{
            color: isUpVote
              ? "#FF4500"
              : isUpVote === false
              ? "purple"
              : "black",
          }}
        >
          {likes}
        </p>

        <button
          onClick={handleMinus}
          style={{
            color: isUpVote === false ? "purple" : "black",
          }}
        >
          {isUpVote === false ? <PiArrowFatDownFill /> : <PiArrowFatDown />}
        </button>
      </div>
      <p id="showErrorLoginVote">{error}</p>
    </>
  );
}
