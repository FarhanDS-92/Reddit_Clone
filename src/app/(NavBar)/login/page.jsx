import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";

export default function Login() {
  return (
    <section id="login">
      <FaReddit className="redditIcon" />
      <h1 className="titleWelcome">Welcome Back!</h1>

      <form id="loginForm">
        <div className="username">
          <label>Username</label>
          <input type="text" className="loginInputs" placeholder="username" />
        </div>
        <div className="password">
          <label>Password</label>
          <input
            type="password"
            className="loginInputs"
            placeholder="password"
          />
        </div>
        <button className="btnLR">Login</button>
      </form>

      <div id="login-register">
        <p>
          Don't have an account?
          <Link href={"/register"} id="login-register-styles">
            <span id="login-register-link">Register Here</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
