import { storage } from "@/shared/storage/localStorage";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 5000,
});

export const walletService = {
    get: async () => {
        return await api.get("/wallet/investment", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${storage.get<string>("token")}`
            }
        });
    },
};