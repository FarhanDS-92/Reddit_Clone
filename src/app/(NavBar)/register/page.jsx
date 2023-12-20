import Link from "next/link.js";

export default function Register() {
  return (
    <section id="register">
      <form id="registerForm">
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
