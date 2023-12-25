"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateTitledPost({ checkUser, subreddits }) {
  const [choiceSelect, setChoiceSelect] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!checkUser) {
      return setError("You need to login to create a post!");
    } else {
      if (choiceSelect && title && message) {
        const res = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            message: message,
            subredditId: choiceSelect,
          }),
        });

        const data = await res.json();

        if (data.error) {
          return setError(data.error.message);
        } else {
          router.refresh();
          router.push(`/subreddits/${choiceSelect}`);
        }
      } else {
        setError(
          "You need to choose a subreddit and create a title and a message!"
        );
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div id="select-container">
        <select
          name="subreddits"
          id="select-drop-down"
          required
          value={choiceSelect}
          onChange={(e) => {
            setChoiceSelect(e.target.value);
          }}
        >
          <option value="">&#x25CC; Choose a subreddit</option>

          {subreddits.map((subreddit) => (
            <option
              value={subreddit.id}
              key={subreddit.name}
              className="dropDownFont"
            >
              r/ {subreddit.name}
            </option>
          ))}
        </select>
      </div>

      <div id="create-post-container">
        <input
          required
          type="text"
          id="create-post-title"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          required
          name="message"
          id="create-post-msg"
          placeholder="Text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        <hr />
        <div id="submit-btn-create-post-container">
          <button
            type="submit"
            id="submit-btn-create-post"
            style={{
              color: choiceSelect && title && message ? "white" : "black",
              backgroundColor:
                choiceSelect && title && message ? "green" : "gray",
              cursor:
                choiceSelect && title && message ? "pointer" : "not-allowed",
            }}
          >
            Post
          </button>
        </div>
      </div>
      <p id="submit-create-post-error">{error}</p>
    </form>
  );
}
