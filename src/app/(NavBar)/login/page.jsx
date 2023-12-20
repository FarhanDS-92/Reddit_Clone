import Link from "next/link.js";

export default function Login() {
  return (
    <section id="login">
      <form id="loginForm">
        <h1>Welcome Back!</h1>
        <div id="login-username">
          <label>Username</label>
          <input type="text" />
        </div>
        <div id="login-password">
          <label>Password</label>
          <input type="password" />
        </div>
        <button>Login</button>
      </form>
      <div id="login-register">
        <p>Don't have an account? Register Here:</p>
        <button id="login-RegisterBtn">
          <Link href={"/register"}>Register?</Link>
        </button>
      </div>
    </section>
  );
}
