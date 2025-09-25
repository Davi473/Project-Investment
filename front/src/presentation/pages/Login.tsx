import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUseCase } from "../../domain/useCases/LoginUseCase";
import { storage } from "../../infra/storage/localStorage";

const Login: React.FC = () => {
    const [enterPassword, setEnterPassword] = useState<boolean>(false);
    const [enterEmail, setEnterEmail] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const navigater = useNavigate();

    const loginUser = async () => {
        if (!email) setEnterEmail(true);
        if (!password) setEnterPassword(true);
        if (!email || !password) return;
        try {
            const result = await loginUseCase({ email, password });
            storage.set<string>("token", result.token);
            navigater("/home");
        } catch (e: any) {
            alert(e.response.data.message || "Server Down");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="d-flex flex-column gap-3 text-white text-center">
                <h1 className="fw-bold">Login</h1>

                <div className="text-start w-100">
                    { 
                        enterEmail ? 
                            <label className="text-danger ms-2">Enter your E-mail</label> : 
                            <label className="form-label ms-2">E-mail</label> 
                    }
                    <input
                        type="email"
                        placeholder="Enter your e-mail"
                        className="form-control rounded-pill shadow-sm bg-light"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEnterEmail(false);
                        }}
                        value={email}
                    />
                </div>

                <div className="text-start w-100">
                    { 
                        enterPassword ? 
                            <label className="text-danger ms-2">Enter your Password</label> : 
                            <label className="form-label ms-2">Password</label> 
                    }
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="form-control rounded-pill shadow-sm bg-light"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setEnterPassword(false);
                        }}
                        value={password}
                    />
                </div>

                <input
                    type="button"
                    value="Enter"
                    className="btn btn-secondary rounded-pill shadow px-3 py-2 fw-bold opacity-100 hover-opacity-75"
                    onClick={() => loginUser()}
                />

                <span className="mt-2 text-white-50">
                    Click here to{" "}
                    <span
                        className="text-decoration-underline text-white"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigater("/register")}
                    >
                        Register
                    </span>
                </span>
            </div>
        </div>
    );
};

export default Login;