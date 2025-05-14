import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TokenModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [orderName, setOrderName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000082] ">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl mb-4">Atualizar Token</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Nome do pedido"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenModal;
