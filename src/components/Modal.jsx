// --------------------------------------------------------------------------------Modal Code

// "use client";
// import { useEffect, useRef } from "react";
// import { useSearchParams, useRouter } from "next/navigation.js";

// export default function Modal({ isOpen, onClose, children }) {
//   const router = useRouter();
//   const dialogRef = useRef(null);
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const query = new URLSearchParams(searchParams);
//     const showDialog = query.get("showDialog");

//     if (showDialog === "true") {
//       dialogRef.current.showModal();
//     } else {
//       dialogRef.current.close();
//     }
//   }, [isOpen, searchParams]);

//   const handleClose = () => {
//     onClose && onClose();
//     router.push("/");
//   };

//   return (
//     <dialog ref={dialogRef} onClose={handleClose}>
//       {children}
//       <button onClick={handleClose}>Close</button>
//     </dialog>
//   );
// }

// -------------------------------------------------------------------------------Login Code

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation.js";
// import Modal from "@/components/Modal.jsx";

// export default function Login() {
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const shouldOpenModal = true;

//     if (shouldOpenModal) {
//       setIsModalOpen(true);
//       router.replace("/login?showDialog=true");
//     }
//   }, []);

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <section>
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <h2>Modal Content</h2>
//         <p>Content</p>
//       </Modal>
//     </section>
//   );
// }

// ------------------------------------------------------------------------------------------testing

// testing
// "use client";
// import { useEffect, useRef } from "react";
// import { useSearchParams } from "next/navigation.js";

// export default function Modal({ isOpen, onClose, children }) {
//   const searchParams = useSearchParams();
//   const dialogRef = useRef(null);

//   const showDialog = searchParams.get("showDialog");

//   useEffect(() => {
//     if (isOpen) {
//       dialogRef.current.showModal();
//     } else {
//       dialogRef.current.close();
//     }
//   }, [isOpen]);

//   const handleClose = () => {
//     onClose && onClose();
//   };

//   return (
//     <dialog ref={dialogRef} onClose={handleClose}>
//       {children}
//       <button onClick={handleClose}>Close</button>
//     </dialog>
//   );
// }

// const [isModalOpen, setIsModalOpen] = useState(false);

// const openModal = () => {
//   setIsModalOpen(true);
// };

// const closeModal = () => {
//   setIsModalOpen(false);
// };

// <button onClick={openModal}>
//   <Link href={"/login"}>Log In</Link>
// </button>
// <Modal isOpen={isModalOpen} onClose={closeModal}>
//   <h2>Modal Content</h2>
//   <p>Content</p>
// </Modal>
