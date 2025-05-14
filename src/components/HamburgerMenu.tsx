import React, { JSX, useState } from "react";
import TokenModal from "./modals/TokenModal";
import { useModal } from "../context/ModalContext";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
const { setModal, clearModal } = useModal ();

  const openTokenModal = () => {
    setModal(<TokenModal />);
  }

  const openPasswordModal = () => {
  }
  

  return (
    <div className="relative flex items-center">
      {/* Botão estilo YouTube */}
      <button className="p-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Fechar menu" : "Abrir menu"}>
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-gray-900"></span>
          <span className="block w-6 h-0.5 bg-gray-900"></span>
          <span className="block w-6 h-0.5 bg-gray-900"></span>
        </div>
      </button>

      {/* Drawer lateral */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-xl transform transition-transform duration-300 z-40 w-auto ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 inline-block">
          <div>
            <button className="absolute top-4" onClick={() => setIsOpen(false)} aria-label="Fechar menu">
              <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-center mb-4">Menu</h2>
          </div>
          <ul className="flex flex-col text-2xl		  space-y-2">
            <li>
              <a onClick={openTokenModal} href="#" className="block px-4 py-2 rounded hover:bg-gray-100">
                Atualizar Token
              </a>
            </li>
            <li>
              <a onClick={openPasswordModal} href="#" className="block px-4 py-2 rounded hover:bg-gray-100">
                Mudar senha
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default HamburgerMenu;
