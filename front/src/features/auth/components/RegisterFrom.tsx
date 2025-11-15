import { Input } from "@/shared/components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateEmail } from "@/shared/utils/validateEmail";

export const RegisterFrom: React.FC = () => {
    const [enterPassword, setEnterPassword] = useState<string>("");
    const [enterEmail, setEnterEmail] = useState<string>("");
    const [enterName, setEnterName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const { handleRegister } = useAuth();
    const navigater = useNavigate();

    const registerUser = async () => {
        if (!email || !password || !name) {
            setEnterEmail("Enter your E-mail");
            setEnterPassword("Enter your Password");
            setEnterName("Enter your Name");
            return;
        }
        if (!validateEmail(email)) return setMessage("E-mail Invalid");
        try {
            await handleRegister(name, email, password );
            navigater("/login");
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
                placeholder={"Enter your E-mail"}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                    setEnterEmail("");
                }}
                error={enterEmail}
            />

            {/* Name the User */}
            <Input
                label={"Name"}
                type={"text"}
                value={name}
                placeholder={"Enter your Name"}
                onChange={(e) => {
                    setName(e.target.value);
                    setMessage("");
                    setEnterName("");
                }}
                error={enterName}
            />

            {/* Password the User */}
            <Input
                label={"Password"}
                type={"password"}
                value={password}
                placeholder={"Enter your Name"}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                    setEnterPassword("");
                }}
                error={enterPassword}
            />

            {/* Menssage */}
            {message && (
                <div className="text-center">
                    <small className="text-danger">{message}</small>
                </div>
            )}

            <input
                type="button"
                value="Enter"
                className="btn btn-secondary rounded-pill shadow px-3 py-2 fw-bold opacity-100 hover-opacity-75"
                onClick={() => registerUser()}
            />
        </>
    );
};