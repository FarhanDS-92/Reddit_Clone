"use client";

import InteractiveLikes from "./InteractiveLikes.jsx";
import DeleteBtn from "./Delete.jsx";
import { CiEdit } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function CommentContent({
  post,
  user,
  votes,
  checkUser,
  subredditId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(post.message);
  const [editError, setEditError] = useState("");

  const [isReplying, setIsReplying] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [replyError, setReplyError] = useState("");

  const router = useRouter();

  function handleShowEdit() {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setEditError("");
    }
  }

  async function handleSubmitEdit(e) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        message: editValue,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return setEditError(data.error);
    }

    setIsEditing(false);
    setEditError("");
    router.refresh();
  }

  function handleShowReply() {
    if (!isReplying) {
      setIsReplying(true);
    } else {
      setIsReplying(false);
      setReplyError("");
    }
  }

  async function handleSubmitReply(e) {
    e.preventDefault();

    const res = await fetch(`/api/posts/`, {
      method: "POST",
      body: JSON.stringify({
        message: replyValue,
        subredditId: subredditId,
        parentId: post.id,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return setReplyError(data.error);
    }

    setIsReplying(false);
    setReplyError("");
    router.refresh();
  }

  function getNumberOfVotes(postId) {
    const votesForPost = votes.filter((vote) => vote.postId === postId);
    let numberOfVotes = 0;
    for (let i = 0; i < votesForPost.length; i++) {
      if (votesForPost[i].isUpvote === true) {
        numberOfVotes += 1;
      } else if (votesForPost[i].isUpvote === false) {
        numberOfVotes -= 1;
      }
    }
    return numberOfVotes;
  }

  return (
    <div className="comment-content">
      <div className="comment-details">
        {!isEditing ? (
          <p>{post.message}</p>
        ) : (
          <form
            className="comment-submit-edit-form"
            onSubmit={handleSubmitEdit}
          >
            <textarea
              className="comment-edit"
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            ></textarea>
            <button type="submit" className="comment-submit-edit-btn">
              Submit Changes
            </button>
            <p className="comment-edit-error">{editError}</p>
          </form>
        )}

        <div className="interactive-btns">
          <InteractiveLikes
            votes={getNumberOfVotes(post.id)}
            post={post}
            user={user}
            checkUser={checkUser}
          />

          <div className="reply" onClick={handleShowReply}>
            <FaRegCommentAlt className="icons" />
            Reply
          </div>

          {user.id === post.userId ? (
            <div className="edit" onClick={handleShowEdit}>
              <CiEdit className="icons" />
              <p>Edit</p>
            </div>
          ) : null}

          {user.id === post.userId ? <DeleteBtn post={post} /> : null}
        </div>

        {!isReplying ? null : (
          <form
            className="comment-submit-reply-form"
            onSubmit={handleSubmitReply}
          >
            <textarea
              className="comment-reply-form"
              placeholder="reply here..."
              value={replyValue}
              onChange={(e) => {
                setReplyValue(e.target.value);
              }}
            ></textarea>
            <button
              type="submit"
              className="comment-submit-reply-btn"
              style={{
                color: replyValue ? "white" : "black",
                backgroundColor: replyValue ? "green" : "gray",
                cursor: replyValue ? "pointer" : "not-allowed",
              }}
            >
              Reply
            </button>
            <p className="comment-reply-error">{replyError}</p>
          </form>
        )}
      </div>
    </div>
  );
}
