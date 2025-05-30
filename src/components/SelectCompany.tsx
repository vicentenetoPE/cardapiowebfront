import React, { use, useEffect, useState } from "react";
import { httpClient } from "../config/httpClient";
import { CompanyProfile } from "../types/companyProfile.type";
import { Select, MenuItem, SelectChangeEvent, FormControl } from "@mui/material";
import { useCompany } from "../context/CompanyContext";

export const SelectCompany = () => {
    const companyContext = useCompany();
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

    const onChangeCompany = (event: SelectChangeEvent) => {
        const selectedId = event.target.value as string;
        setSelectedCompanyId(selectedId);
        const selectedCompany = companyContext.availableCompanies.find(company => company.id === Number(selectedId));
        if (selectedCompany) {
            companyContext.setCompany(selectedCompany);
            localStorage.setItem("selectedCompany", JSON.stringify(selectedCompany));
        }
    };

    return (
        <div className="flex flex-col gap-4 flex-1 sm:w-64">
            <FormControl fullWidth>
                <Select
                    className="w-full"
                    value={selectedCompanyId}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={onChangeCompany}
                    renderValue={(selected) => {
                        if (!selected || (Array.isArray(selected) && selected.length === 0)) {
                            return <span className="text-gray-400">Selecione uma empresa</span>;
                        }
                        const company = companyContext.availableCompanies.find((company) => company.id === Number(selected));
                        return (
                            <div className="flex gap-2 items-center">
                                <img src={company?.logo} alt={company?.name} className="w-8 h-8 rounded-full" />
                                <span className="text-gray-800">{company?.name}</span>
                            </div>
                        );
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                maxHeight: 48 * 4.5 + 8,
                                width: 250,
                            },
                        },
                    }}
                >
                    {companyContext.availableCompanies.map((company) => (
                        <MenuItem key={company.id} value={company.id}>
                            <div className="flex gap-2 items-center">
                                <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-full" />
                                <span className="text-gray-800">{company.name}</span>
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};