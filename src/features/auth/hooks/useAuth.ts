import { useAuthContext } from "../context/AuthContext";
import { authService } from "../services/authService";

export const useAuth = () => {
    const { user, login, logout } = useAuthContext();

    const handleLogin = async (email: string, password: string) => {
        const response = await authService.login(email, password);
        login(response.data.user);
        return response;
    };

    const handleRegister = async (name: string, email: string, password: string) => {
        return await authService.register(name, email, password);
    };

    return { user, handleLogin, handleRegister, logout };
};
