import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";
import CreateSubreddit from "./CreateSubReddit.jsx";

export default function SubredditsComponent({ subreddits }) {
  return (
    <>
      <CreateSubreddit />
      {subreddits.map((subReddit) => {
        return (
          <Link
            key={subReddit.id}
            href={`/subreddits/${subReddit.id}`}
            className="defaultSubReddit"
          >
            <FaReddit id="subRedditIcon" />
            <p id="subredditPosts">r/ {subReddit.name}</p>
          </Link>
        );
      })}
    </>
  );
}
