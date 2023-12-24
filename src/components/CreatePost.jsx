import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";

export default function CreatePost() {
  return (
    <>
      <Link id="createPost" href={"/createPost"}>
        <FaReddit id="createPostIcon" />
        <input type="text" placeholder="Create a post" id="createPostInput" />
      </Link>
    </>
  );
}
