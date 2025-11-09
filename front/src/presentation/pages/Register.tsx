import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUseCase } from "../../domain/useCases/RegisterUseCase";

const Register: React.FC = () => {
    const [enterPassword, setEnterPassword] = useState<boolean>(false);
    const [enterEmail, setEnterEmail] = useState<boolean>(false);
    const [enterName, setEnterName] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const navigater = useNavigate();

    const registerUser = async () => {
        if (!email) setEnterEmail(true);
        if (!password) setEnterPassword(true);
        if (!name) setEnterName(true);
        if (!email || !name || !password) return;
        try {
            await registerUseCase({ name, email, password });
            navigater("/login");
        } catch (e: any) {
            alert(e.response.data.message || "Server Down");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">

            <div className="text-center d-flex flex-column gap-3 text-white">
                <h1>Register</h1>

                <div className="mb-3 text-start">
                    { 
                        enterEmail ? 
                            <label className="text-danger ms-2">Enter your E-mail</label> : 
                            <label className="form-label ms-2">E-mail</label> 
                    }
                    <input
                        type="email"
                        placeholder="Enter your e-mail"
                        className="form-control rounded-pill shadow-sm"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEnterEmail(false);
                        }}
                        value={email}
                    />
                </div>

                <div className="mb-3 text-start">
                    { 
                        enterName ? 
                            <label className="text-danger ms-2">Enter your Name</label> : 
                            <label className="form-label ms-2">Name</label> 
                    }
                    <input
                        type="text"
                        placeholder="Choose a nickname"
                        className="form-control rounded-pill shadow-sm"
                        onChange={(e) => {
                            setName(e.target.value);
                            setEnterName(false);
                        }}
                        value={name}
                    />
                </div>

                <div className="mb-3 text-start">
                    { 
                        enterPassword ? 
                            <label className="text-danger ms-2">Enter your Password</label> : 
                            <label className="form-label ms-2">Password</label> 
                    }
                    <input
                        type="password"
                        placeholder="Create a password"
                        className="form-control rounded-pill shadow-sm"
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
                    onClick={() => registerUser()}
                />

                <span className="mt-2 text-white-50">
                    Click here to{" "}
                    <span
                        className="text-white text-decoration-underline"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigater("/login")}
                    >
                        Log In
                    </span>
                </span>
            </div>
        </div>
    );
};


export default Register;