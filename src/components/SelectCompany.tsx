import React from 'react'
import { httpClient } from '../config/httpClient';
import { CompanyProfile } from '../types/companyProfile.type';
import { Select, MenuItem } from '@mui/material';

export const SelectCompany = () => {
    const [companies, setCompanies] = React.useState<CompanyProfile[]>([]);
    const [selectedCompany, setSelectedCompany] = React.useState<string | null>(null);

    React.useEffect(() => {
        getCompanies();
        getSelectedCompany();
    }, []);

    const getCompanies = async () => {
        const res = await httpClient.get("/companies");
        setCompanies(res.data);
    }

    const getSelectedCompany = async() => {
        const res = await httpClient.get("/selectedCompany");
        setSelectedCompany(res.data);
    }

 

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Selecione a empresa</h1>
            <Select
                className="w-full"
                defaultValue=""
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <span className="text-gray-400">Selecione uma empresa</span>
                    }
                    const company = companies.find((company) => company.id === Number(selected));
                    return (
                        <div className="flex gap-2 items-center">
                            <img src={company?.logo} alt={company?.name} className="w-8 h-8 rounded-full" />
                            <span className="text-gray-800">{company?.name}</span>
                        </div>
                    )
                }
                }
                MenuProps={{
                    PaperProps: {
                        sx: {
                            maxHeight: 48 * 4.5 + 8,
                            width: 250,
                        },
                    },
                }}
            >
                {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                        <div className="flex gap-2 items-center">
                            <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-full" />
                            <span className="text-gray-800">{company.name}</span>
                        </div>
                    </MenuItem>
                ))}
                
            </Select>
        </div>
    )
}
