"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateSubreddit({ checkUser }) {
  const [showButton, setShowButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [subRedditName, setSubRedditName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, SetIsLoading] = useState(false);

  const router = useRouter();

  function handleCreateClick() {
    if (checkUser) {
      setShowButton(false);
    } else {
      setIsLoggedIn("You need to login to create a subreddit.");
    }
  }

  async function handleSubmitSubReddit(e) {
    e.preventDefault();

    SetIsLoading(true);

    const res = await fetch("/api/subreddits", {
      method: "POST",
      body: JSON.stringify({
        name: subRedditName,
      }),
    });

    const data = await res.json();

    if (data.error) {
      SetIsLoading(false);

      return setError(data.error);
    }

    SetIsLoading(false);
    setError("");
    setSubRedditName("");
    setShowButton(true);
    router.refresh();
  }

  function handleCancelClick() {
    setError("");
    setShowButton(true);
  }

  return (
    <>
      {isLoading ? (
        <span className="loaderComponent"></span>
      ) : (
        <>
          {showButton ? (
            <div className="create-SubReddit-container">
              <button id="createSubreddit" onClick={handleCreateClick}>
                + Create A Subreddit
              </button>
            </div>
          ) : (
            <div className="create-SubReddit-container">
              <form id="create-SubReddit-form" onSubmit={handleSubmitSubReddit}>
                <input
                  type="text"
                  id="create-SubReddit-input"
                  placeholder="r/subReddit Name"
                  value={subRedditName}
                  onChange={(e) => {
                    setSubRedditName(e.target.value);
                  }}
                  onSubmit={handleSubmitSubReddit}
                />
                <button type="submit" id="create-SubReddit-submitBtn">
                  Submit
                </button>
                <button
                  type="button"
                  id="create-SubReddit-cancelBtn"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </form>
              <p id="create-SubReddit-error">{error}</p>
            </div>
          )}
          <p id="create-subreddit-is-logged-in-msg">{isLoggedIn}</p>
        </>
      )}
    </>
  );
}
