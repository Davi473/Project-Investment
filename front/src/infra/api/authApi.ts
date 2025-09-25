import api from "../../shared/config/axiosConfig";

export const authApi = {
    login: async (data: { email: string; password: string }) => {
        const response = await api.put("/users", data);
        return response.data;
    },

    register: async (data: { name: string; email: string; password: string }) => {
        const response = await api.post("/users", data);
        return response.data;
    },
};
