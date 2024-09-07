import React, { useState, useEffect } from "react";
import "./modal.css";
import { MdClose } from "react-icons/md";
const Modal = ({ children, isOpen, onClose,title='' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Wait for animation to finish
    }
  }, [isOpen]);

  return (
    <div
      className={`z-50 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center overflow-hidden transition-opacity duration-300 ease-out ${
        isOpen
          ? " fade-in opacity-100"
          : " fade-out opacity-0 fade-out pointer-events-none"
      }`}
      // onClick={onClose}
    >
      <div
        className={`modal-content relative  bg-white  min-w-96 shadow-md rounded-md transform transition-transform duration-300 ease-out ${
          isOpen ? "slide-in" : "slide-out"
        }`}
        onClick={(e) => e.stopPropagation()}
      >  <div className=" px-4 py-2 text-xl font-semibold text-gray-600">{title}</div>
        <div onClick={onClose} className=" absolute z-30  top-2 right-2 cursor-pointer hover:border hover:bg-red-500 hover:text-white duration-300 text-red-500">{<MdClose size={28} />}</div>
        {isVisible && children}
      </div>
    </div>
  );
};

export default Modal;
