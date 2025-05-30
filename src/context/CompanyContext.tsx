import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CompanyProfile } from "../types/companyProfile.type";
import { SocketContext } from "./SocketContext";
import { httpClient } from "../config/httpClient";

interface CompanyContextProps {
  company: CompanyProfile | null;
  setCompany: React.Dispatch<React.SetStateAction<CompanyProfile | null>>;
  availableCompanies: CompanyProfile[];
}

const CompanyContext = createContext<CompanyContextProps | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [availableCompanies, setAvailableCompanies] = React.useState<CompanyProfile[]>([]);
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const fakedCompanies: CompanyProfile[] = [
      {
        id: 1,
        name: "Empresa A",
        logo: "https://placecats.com/300/200",
        city: "São Paulo",
        neighborhood: "Centro",
        url_name: "empresa-a",
      },
      {
        id: 2,
        name: "Empresa B",
        logo: "https://placecats.com/neo/300/200",
        city: "Rio de Janeiro",
        neighborhood: "Copacabana",
        url_name: "empresa-b",
      },
      {
        id: 3,
        name: "Empresa C",
        logo: "https://placecats.com/millie/300/150",
        city: "Belo Horizonte",
        neighborhood: "Savassi",
        url_name: "empresa-c",
      },
    ];
    setAvailableCompanies(fakedCompanies);
    setCompany(fakedCompanies[0]);
  }, []);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    const res = await httpClient.get("/companies");
    setAvailableCompanies(res.data);
  };


  useEffect(() => {
      console.log("Empresa selecionada:", company);
    if (company) {
      socket.emit("changeCompany", company.id);
    }
  }, [company, socket]);

  return (
    <CompanyContext.Provider value={{ company, setCompany, availableCompanies }}>{children}</CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextProps => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany deve ser usado dentro de CompanyProvider");
  }
  return context;
};
