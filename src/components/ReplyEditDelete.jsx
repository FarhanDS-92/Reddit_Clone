"use client";

import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";

export default function ReplyEditDelete({ post, user }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  console.log(user, post);
  useEffect(() => {
    if (user.id === post.userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="reply-edit--delete-container">
        {isLoggedIn ? <></> : null}
      </div>
    </>
  );
}
