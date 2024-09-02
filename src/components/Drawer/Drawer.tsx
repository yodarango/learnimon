// Drawer.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./Drawer.scss";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className='backdrop-71jt' onClick={onClose} />
      <div className={`drawer-71jt ${isOpen ? "open" : ""} bg-beta p-6`}>
        {children}
      </div>
    </>,
    document.getElementById("layover") as HTMLElement
  );
};
