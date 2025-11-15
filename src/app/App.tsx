// src/app/App.tsx
import { AppRoutes } from "./routes";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export const App = () => (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
);
