"use client";

import { CiEdit } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCommentAlt } from "react-icons/fa";
import InteractiveLikes from "./InteractiveLikes.jsx";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import { getNumberOfVotes } from "@/lib/getNumberOfVotes.js";

export default function DisplayMainPost({
  post,
  user,
  votes,
  checkUser,
  subreddit,
}) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [message, setMessage] = useState(post.message);
  const [error, setError] = useState("");

  const router = useRouter();
  const getVotes = getNumberOfVotes(post.id, votes);

  function handleEdit() {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        message,
      }),
    });
    const data = await res.json();
    if (data.error) {
      return setError(data.error);
    }
    setEdit(false);
    router.refresh();
  }

  async function handleDeletePost(e) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    });

    router.push(`/subreddits/${subreddit.id}`);
  }

  return (
    <div id="mainPostContainer">
      <div>
        <h5>
          <FaUserCircle id="circleIcon" />
          Posted by u/ {post.user.username}
        </h5>
        <div id="mainPostDetails">
          {!edit ? (
            <>
              <h1>{post.title}</h1>
              <p>{post.message}</p>
            </>
          ) : (
            <form id="mainPostFormContainer" onSubmit={handleEditSubmit}>
              <input
                type="text"
                id="mainPostTitle"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <textarea
                id="mainPostMessage"
                placeholder="Message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>

              <button type="submit" id="mainPost-submit-edit">
                Submit Change
              </button>

              <p id="mainPost-error-edit">{error}</p>
            </form>
          )}
        </div>
      </div>

      <div id="main-btns">
        <div id="mainPost-Likes-Comments">
          <InteractiveLikes
            votes={getVotes}
            post={post}
            user={user}
            checkUser={checkUser}
          />

          <div id="mainPost-comments">
            <FaRegCommentAlt />
            <p>Comments</p>
          </div>
        </div>

        {user.id === post.user.id ? (
          <div id="mainPost-delete-edit-container">
            <button onClick={handleEdit}>
              <CiEdit />
            </button>
            <button onClick={handleDeletePost}>
              <RiDeleteBinLine />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
