import { storage } from "@/shared/storage/localStorage";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 5000,
});

export const authService = {
    login: async (email: string, password: string) => {
        return await api.put("/users", { email, password });
    },

    register: async (name: string, email: string, password: string) => {
        return await api.post("/users", { name, email, password });
    },

    get: async () => {
        return await api.get("/users", {
            headers: {Authorization: `Bearer ${storage.get<string>("token")}`}
        });
    }
};