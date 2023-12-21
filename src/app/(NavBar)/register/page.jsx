"use client";
import Link from "next/link.js";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

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
    <section id="register">
      <form id="registerForm" onSubmit={handleRegister}>
        <h1>Join Us Here On Reddit!</h1>
        <div id="register-username">
          <label>Username</label>
          <input type="text" />
        </div>
        <div id="register-password">
          <label>Password</label>
          <input type="password" />
        </div>
        <button>
          <Link href={"/"}>Register</Link>
        </button>
      </form>
    </section>
  );
}
