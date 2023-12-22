"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import { FaReddit } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.error) {
      return setError(data.error);
    }
    router.push("/");
    router.refresh();
  }

  return (
    <section id="register" aria-label="Register Page" role="region">
      <FaReddit className="redditIcon" />
      <h1 className="titleWelcome" id="titleWelcomeMargin">
        Join Us Here On Reddit!
      </h1>

      <form id="registerForm" onSubmit={handleRegister}>
        <div className="username">
          <label>Username</label>
          <input
            type="text"
            value={username}
            placeholder="username"
            className="loginInputs"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            className="loginInputs"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btnLR">
          Register
        </button>
      </form>
      <p className="errorMsg">{error}</p>
    </section>
  );
}
