import {  httpClient } from "../../config/httpClient";

export const useApi = <T>(url: string, initialData: T) => {
    return{

        getAPIStatus: async (companyId:string) => {
            try{
                const res = await httpClient.get(`/${companyId}/enableApi`);
                return res.data;
            }
            catch (error) {
                console.error("Error fetching API status:", error);
                throw error;
            }
        },
        getDelay: async (companyId: string) => {
            try {
                const res = await httpClient.get(`/${companyId}/delay`);
                return res.data;
            } catch (error) {
                console.error("Error fetching delay:", error);
                throw error;
            }
        },
        setDelay: async (companyId: string, delay: number) => {
            try {
                const res = await httpClient.get(`/delay/${companyId}/${delay}`);
                return res.data;
            } catch (error) {
                console.error("Error setting delay:", error);
                throw error;
            }
        }


        
    }
}