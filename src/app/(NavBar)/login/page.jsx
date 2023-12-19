"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import Modal from "@/components/Modal.jsx";

export default function Login() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const shouldOpenModal = true;

    if (shouldOpenModal) {
      setIsModalOpen(true);
      router.replace("/login?showDialog=true");
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Modal Content</h2>
        <p>Content</p>
      </Modal>
    </main>
  );
}
