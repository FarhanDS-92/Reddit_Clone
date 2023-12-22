"use client";

import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/users/login", {
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
    <section id="login" aria-label="Login Page" role="region">
      <FaReddit className="redditIcon" />
      <h1 className="titleWelcome">Welcome Back!</h1>

      <form id="loginForm" onSubmit={handleSubmit}>
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
        <button className="btnLR" type="submit">
          Login
        </button>
      </form>

      <div id="login-register">
        <p>
          Don't have an account?
          <Link href={"/register"} id="login-register-styles">
            <span id="login-register-link">Register Here</span>
          </Link>
        </p>
      </div>
      <p className="errorMsg">{error}</p>
    </section>
  );
}
