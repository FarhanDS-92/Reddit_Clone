"use client";

import { useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function EditBtn() {
  const [isClicked, setIsClicked] = useState("");

  return (
    <>
      <div className="edit">
        <CiEdit className="icons" />
        <p>Edit</p>
      </div>
    </>
  );
}
