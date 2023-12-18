import Link from "next/link.js";

export default function NavBar() {
  return (
    <header>
      <nav id="navigation">
        <ul id="navbar">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/subreddits"}>Subreddits</Link>
          </li>
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
          <li>
            <Link href={"/register"}>Register</Link>
          </li>
          <li>
            <Link href={"/logout"}>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
