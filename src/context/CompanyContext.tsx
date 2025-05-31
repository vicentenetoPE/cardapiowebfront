import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CompanyProfile } from "../types/companyProfile.type";
import { SocketContext } from "./SocketContext";
import { httpClient } from "../config/httpClient";

interface CompanyContextProps {
  company: CompanyProfile | null;
  setCompany: (company: CompanyProfile | null) => void;
  availableCompanies: CompanyProfile[];
}

const CompanyContext = createContext<CompanyContextProps | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
    const defaultCompanies: CompanyProfile[] = [
       {
      id: 8267,
      name: "Dom Helder Pizzaria | Cachoeirinha",
      url_name: "dom_helder_pizzaria__cachoeirinha",
      neighborhood: "Cachoeirinha",
      city: "Manaus",
      logo: "https://storage.googleapis.com/prod-cardapio-web/uploads/company/logo/8267/2d138d82LOGO_-_2025.png",
    },
    {
      id: 8268,
      name: "Dom Helder Pizzaria | Aleixo",
      url_name: "dom_helder_pizzaria__aleixo",
      neighborhood: "Aleixo",
      city: "Manaus",
      logo: "https://storage.googleapis.com/prod-cardapio-web/uploads/company/logo/8268/3b74c144LOGO_-_2025.png",
    },
  ];
  const [availableCompanies, setAvailableCompanies] = React.useState<CompanyProfile[]>(defaultCompanies);
  const [company, setCompan] = useState<CompanyProfile | null>(defaultCompanies[0]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    const res = await httpClient.get("/companies");
    setAvailableCompanies(res.data);
  };

  const setCompany = (company: CompanyProfile | null) => {
    if (company) {
      httpClient.defaults.headers.common["companyId"] = company.id.toString();
      setCompan(company);
    }
  }


  useEffect(() => {
    if (company) {
      socket.emit("changeCompany", company.id);
      httpClient.defaults.headers.common["companyId"] = company.id.toString();
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
