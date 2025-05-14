import React, { FormEvent, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { httpClient } from "../../config/httpClient";

const TokenModal = () => {
  const { setModal } = useModal();
  const [token, setToken] = useState({
    token_type: "",
    token_value: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    httpClient.post("/token", token)
    setModal(null);
  };

  function onClose() {
    setModal(null);
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToken((prev) => ({
      ...prev,
      token_type: e.target.value,
    }));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setToken((prev) => ({
      ...prev,
      token_value: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000082] z-51">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl mb-4">Atualizar Token</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            className="w-full border p-2 rounded"
            required
            value={token.token_type}
            onChange={handleTypeChange}
          >
            <option value="" disabled>
              Selecione o tipo de token
            </option>
            <option value="access_token">Access Token</option>
            <option value="refresh_token">Refresh Token</option>
          </select>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Token"
            required
            value={token.token_value}
            onChange={handleValueChange}
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