import api from "../../shared/config/axiosConfig";
import { storage } from "../storage/localStorage";

export const authApi = {
    login: async (data: { email: string; password: string }) => {
        const response = await api.put("/users", data);
        return response;
    },

    register: async (data: { name: string; email: string; password: string }) => {
        const response = await api.post("/users", data);
        return response;
    },

    get: async () => {
        const response = await api.get("/users", {
            headers: {
                Authorization: `Bearer ${storage.get<string>("token")}`
            }
        });
        return response;
    },
};
