import { createContext, useContext, useState } from "react";


interface AuthContextProps {
    user: any | null;
    login: (user: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<any | null>(null);

    const login = (user: any) => setUser(user);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
