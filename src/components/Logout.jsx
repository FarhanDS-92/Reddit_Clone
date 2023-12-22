"use client";

import Link from "next/link.js";
import { useRouter } from "next/navigation.js";

export default function Logout() {
  const router = useRouter();

  async function handleClick() {
    await fetch("/api/users/logout", {
      method: "POST",
    });
    router.refresh();
  }

  return (
    <Link onClick={handleClick} href={"/"}>
      Logout
    </Link>
  );
}
