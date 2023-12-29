import Link from "next/link.js";

export default function CreateComment({ post, user }) {
  return (
    <form id="create-comment-container">
      <div id="create-comment-text-container">
        <p>
          Comment as
          <Link href={"/"} id="create-comment-user-link">
            {user.username}
          </Link>
        </p>
        <textarea id="create-comment-text"></textarea>
      </div>
      <div id="create-comment-button-container">
        <button>Comment</button>
      </div>
    </form>
  );
}
