"use client";

import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";

export default function InteractiveLikes({ votes, post, user, checkUser }) {
  const [likes, setLikes] = useState(votes);
  const [isUpVote, setIsUpVote] = useState(null);
  const [voted, setVoted] = useState(null);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (checkUser) {
      setVoted(checkUser.isUpvote);
    }
    router.refresh();
  }, []);

  async function handlePlus() {
    if (user.id) {
      await fetch("/api/votes", {
        method: "POST",
        body: JSON.stringify({
          postId: post.id,
          isUpvote: true,
        }),
      });

      let x;

      if (voted === true) {
        x = likes - 1;
        setLikes(x);
        setVoted(null);
        return setIsUpVote(null);
      } else if (voted === false) {
        x = likes + 2;
        setLikes(x);
      } else {
        x = likes + 1;
        setLikes(x);
      }

      setVoted(true);
      setIsUpVote(true);
    } else {
      setError("You need to login to Upvote!");
    }
  }

  async function handleMinus() {
    if (user.id) {
      await fetch("/api/votes", {
        method: "POST",
        body: JSON.stringify({
          postId: post.id,
          isUpvote: false,
        }),
      });

      let x;

      if (voted === true) {
        x = likes - 2;
        setLikes(x);
      } else if (voted === false) {
        x = likes + 1;
        setLikes(x);
        setVoted(null);
        return setIsUpVote(null);
      } else {
        x = likes - 1;
        setLikes(x);
      }

      setVoted(false);
      setIsUpVote(false);
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
            color: isUpVote || voted ? "#FF4500" : "black",
          }}
        >
          {isUpVote || voted ? <PiArrowFatUpFill /> : <PiArrowFatUp />}
        </button>

        <p
          style={{
            color:
              isUpVote || voted
                ? "#FF4500"
                : isUpVote === false || voted === false
                ? "purple"
                : "black",
          }}
        >
          {likes}
        </p>

        <button
          onClick={handleMinus}
          style={{
            color: isUpVote === false || voted === false ? "purple" : "black",
          }}
        >
          {isUpVote === false || voted === false ? (
            <PiArrowFatDownFill />
          ) : (
            <PiArrowFatDown />
          )}
        </button>
      </div>
      <p id="showErrorLoginVote">{error}</p>
    </>
  );
}
