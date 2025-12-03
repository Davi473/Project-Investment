import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "@/shared/storage/localStorage";
import { Input } from "@/shared/components/Input";
import { useAuth } from "../hooks/useAuth";
import { validateEmail } from "@/shared/utils/validateEmail";

export const LoginFrom: React.FC = () => {
    const [enterPassword, setEnterPassword] = useState<string>("");
    const [enterEmail, setEnterEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const { handleLogin } = useAuth();
    const navigater = useNavigate();

    useEffect(() => {
        const token = storage.get<string>("token");
        if (!token) return;
        navigater("/dashbord");
    }, []);

    const loginUser = async () => {
        if (!email || !password) {
            setEnterEmail("Enter your E-mail");
            setEnterPassword("Enter your Password");
            return;
        };
        if (!validateEmail(email)) return setMessage("E-mail Invalid");
        try {
            const result = await handleLogin(email, password);
            storage.set<string>("token", result.data.token);
            navigater("/dashbord");
        } catch (e: any) {
            setMessage(e.response.data.message);
        }
    };

    return (
        <>
            {/* Email the User */}
            <Input
                label={"E-mail"}
                type={"email"}
                value={email}
                placeholder={"Enter your e-mail"}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                    setEnterEmail("");
                }}
                error={enterEmail}
            />
            
            {/* Password the User */}
            <Input
                label={"Password"}
                type={"password"}
                value={password}
                placeholder={"Enter your password"}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                    setEnterPassword("")
                }}
                error={enterPassword}
            />

            {/* Menssage */}
            {message && (
                <div className="text-center">
                    <small className="text-danger">{message}</small>
                </div>
            )}
            
            {/* Make Login */}
            <input
                type="button"
                value="Enter"
                className="btn btn-secondary rounded-pill shadow px-3 py-2 fw-bold opacity-100 hover-opacity-75"
                onClick={() => loginUser()}
            />
        </>
    );
};