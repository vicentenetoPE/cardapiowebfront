import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
  modal: ReactNode;
  setModal: (modal: ReactNode) => void;
  clearModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode>(null);

  const clearModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, setModal, clearModal }}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};