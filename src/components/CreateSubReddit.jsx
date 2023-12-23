"use client";

import { useState } from "react";

export default function CreateSubreddit({ checkUser }) {
  const [showButton, setShowButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [error, setError] = useState("");

  function handleCreateClick() {
    if (checkUser) {
      setShowButton(false);
    } else {
      setIsLoggedIn("You need to login to create a subreddit.");
    }
  }

  return (
    <>
      {showButton ? (
        <button id="createSubreddit" onClick={handleCreateClick}>
          + Create A Subreddit
        </button>
      ) : (
        <form>
          <input type="text" />
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </form>
      )}
      <p>{isLoggedIn}</p>
    </>
  );
}
