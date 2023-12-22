"use client";
import Link from "next/link.js";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import Logout from "./Logout.jsx";

export default function HamburgerMenu({ checkUser }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="menuContainer" onClick={toggleSidebar}>
      <div id="hamburger-menu">
        <span className="bar"></span>
        <span className="bar middle"></span>
        <span className="bar"></span>
      </div>
      <aside id="sideBar" style={{ opacity: isSidebarOpen ? 1 : 0 }}>
        <nav id="menu">
          <div>
            <Link href={"/"}>
              <FaHome id="homeMenu" />
            </Link>
          </div>
          <div>
            <Link href={"/subreddits"}>
              <span className="fontColor">Subreddits</span>
            </Link>
          </div>

          {!checkUser && (
            <div>
              <Link href={"/login"}>
                <span className="fontColor">Login</span>
              </Link>
            </div>
          )}

          {checkUser && (
            <div>
              <span className="fontColor">
                <Logout />
              </span>
            </div>
          )}
        </nav>
      </aside>
    </div>
  );
}
