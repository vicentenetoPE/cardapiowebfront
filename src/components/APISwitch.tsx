import { Switch } from "@mui/material";
import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { httpClient } from "../config/httpClient";
import { useCompany } from "../context/CompanyContext";

export const APISwitch = () => {
  const socket = useSocket();
  const [enabled, setEnabled] = React.useState(false);
  const company = useCompany().company;

  const fetchApiStatus = async () => {
    try {
      const response = await httpClient.get("/enableApi");
      console.log("Status da API:", response.data.enabled);
      setEnabled(response.data.enabled);
    } catch (error) {
      console.error("Erro ao buscar status da API:", error);
    }
  };

  useEffect(() => {
    socket.on("apiEnabled", () => {
      console.log("API habilitada/desabilitada via socket");
      fetchApiStatus();
    });
    return () => {
      socket.off("apiEnabled"); // Corrigido aqui
    };
  }, [socket]);

  useEffect(() => {
    if (company) {
      fetchApiStatus();
    }
  }, [company]);

  const handleChange = async () => {
    const res = await httpClient.post("/enableApi");
    if (res.status !== 200) {
      console.error("Error ao habilitar/desabilitar a API");
    } else {
      fetchApiStatus(); // Atualiza o estado após a mudança
    }
  };

  return <Switch checked={enabled} onChange={handleChange} />;
};