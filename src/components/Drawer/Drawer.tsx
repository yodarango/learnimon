import { ModalHeader } from "../ModalHeader/ModalHeader";
import ReactDOM from "react-dom";
import React from "react";

// Drawer.tsx
import "./Drawer.scss";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className='backdrop-71jt' onClick={onClose} />
      <div className={`drawer-71jt ${isOpen ? "open" : ""} bg-beta `}>
        <ModalHeader title={title} icon='' onClose={onClose}></ModalHeader>
        <div className='px-6 pb-6'>{children}</div>
      </div>
    </>,
    document.getElementById("layover") as HTMLElement
  );
};
