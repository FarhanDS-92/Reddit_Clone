import Link from "next/link.js";

export default function SubredditsComponent({ subreddits }) {
  return (
    <>
      <button id="createSubreddit">+ Create A Subreddit</button>
      {subreddits.map((subReddit) => {
        return (
          <Link
            key={subReddit.id}
            href={`/subreddits/${subReddit.id}`}
            className="defaultSubReddit"
          >
            r/ {subReddit.name}
          </Link>
        );
      })}
    </>
  );
}
