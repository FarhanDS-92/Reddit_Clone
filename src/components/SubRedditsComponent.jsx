"use client";
import { useRouter } from "next/navigation.js";

export default function SubredditsComponent({ subreddits }) {
  const router = useRouter();

  function handleClickPage(subredditId) {
    router.push(`/subreddits/${subredditId}`);
  }

  return (
    <>
      <button id="createSubreddit">+ Create A Subreddit</button>
      {subreddits.map((subReddit) => {
        return (
          <div
            key={subReddit.id}
            className="defaultSubReddit"
            onClick={() => {
              handleClickPage(subReddit.id);
            }}
          >
            r/ {subReddit.name}
          </div>
        );
      })}
    </>
  );
}
